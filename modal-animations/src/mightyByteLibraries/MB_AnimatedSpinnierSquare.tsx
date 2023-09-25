import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Easing, ViewStyle, StyleProp, View, Text, TextStyle } from 'react-native';
import { COLORS } from '../constants/colors';
import { textStyles } from '../constants/textStyles';

const MB_AnimatedSpinnierSquare = ({ size, containerStyle, loadingText, loadingTextStyle }: { size?: number, containerStyle?: StyleProp<ViewStyle>, loadingText?: string, loadingTextStyle?: StyleProp<TextStyle> }) => {
    const [spinAnimationValue] = useState(new Animated.Value(0));
    const [translateAnimationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const animateRotation = (toValue: number) => {
            Animated.timing(spinAnimationValue, {
                toValue,
                duration: 500,
                useNativeDriver: false,
            }
            ).start(() => {
                let newTranslationValue = toValue === 0 ? 1 : toValue === 1 ? 1 : 0;
                let nextRotationValue = toValue === 0 ? 1 : toValue === 1 ? 2 : 0;

                if (toValue === 2) {
                    spinAnimationValue.setValue(0);
                    newTranslationValue = 0;
                    nextRotationValue = 1;
                }
                animateTranslation(newTranslationValue, nextRotationValue);
            });
        };

        const animateTranslation = (toValue: number, nextRotationValue: number) => {
            Animated.timing(translateAnimationValue, {
                toValue,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
            }
            ).start(() => {
                animateRotation(nextRotationValue);
            });
        };

        animateRotation(1);
    }, [spinAnimationValue, translateAnimationValue]);

    const spin = spinAnimationValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '180deg', '360deg'],
    });

    const yVal = translateAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-38, 0],
    });

    const sizeStyle = size ? { width: size } : {};

    return (
        <View style={containerStyle}>
            <Animated.View style={[styles.outerCube, sizeStyle, { transform: [{ rotate: spin }] }]}>
                <Animated.View style={[styles.innerCube, sizeStyle, { transform: [{ translateY: yVal }] }]} />
            </Animated.View>
            <Text style={[styles.loadingText, loadingTextStyle]}>{loadingText}</Text>
        </View>
    );
};

export { MB_AnimatedSpinnierSquare };

const styles = StyleSheet.create({
    outerCube: {
        width: 38,
        height: 38,
        aspectRatio: 1,
        borderWidth: 4,
        borderColor: COLORS.white, overflow: 'hidden',
    },
    innerCube: {
        backgroundColor: COLORS.white,
        width: 38,
        height: 38,
        aspectRatio: 1,
    },
    loadingText: StyleSheet.flatten([
        textStyles.normalText, {
            marginTop: 16,
        },
    ]),
});
