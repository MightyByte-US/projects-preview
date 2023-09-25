import React, { useRef, useState } from 'react';

import { Animated, Image, ImageProps, ImageResizeMode, ImageSourcePropType, ImageStyle, Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MB_Modal } from '../MB_Modal/MB_Modal';

type IMB_Image = {
    onHoverChange?: (hovered?: boolean) => void
    onPress?: () => void
    disableInteraction?: boolean,
    allowModalPresentationOnPress?: boolean
    style?: StyleProp<ViewStyle>
    resizeMethod?: 'auto' | 'resize' | 'scale' | undefined;
    resizeMode?: ImageResizeMode | undefined;
    source: ImageSourcePropType | string
    disableOnHoverAnimations?: boolean
    activateHover?: boolean
    grayscaleFilter?: number
}


interface IMB_PressableState {
    hovered?: boolean // Exist only on web
    focused?: boolean // Exist only on web
    pressed: boolean
}

const MB_Image = (props: IMB_Image) => {
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const hoverScaleAnimation = useRef(new Animated.Value(0)).current;

    const onImagePressed = () => {
        props.onPress?.();
        if (props.allowModalPresentationOnPress) {
            setIsImageModalVisible(true);
        }
    };

    const imageProps: ImageProps = React.useMemo(() => {
        const source = typeof props.source === 'string' ? { uri: props.source } : props.source;
        let defaultSource = Array.isArray(source) ? undefined : source;
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            defaultSource = undefined;
        }

        return {
            resizeMode: props.resizeMode,
            resizeMethod: props.resizeMethod,
            source,
            defaultSource,
        };
    }, [props.resizeMethod, props.resizeMode, props.source]);

    const animateImage = (toValue: number) => {
        if (!props.disableOnHoverAnimations) {
            Animated.timing(
                hoverScaleAnimation,
                {
                    toValue,
                    duration: 500,
                    useNativeDriver: false,
                }
            ).start();
        }
    };

    const grayscaleStyle = (!props.grayscaleFilter || Platform.OS !== 'web' ? {} : { filter: `grayscale(${props.grayscaleFilter})` }) as StyleProp<ImageStyle>;

    return (
        <View style={[styles.container, props.style]}>
            <MB_Modal isVisible={isImageModalVisible} onDismiss={setIsImageModalVisible} childrenWrapperStyle={styles.modalWrapper}>
                <Image resizeMode="contain" {...imageProps} style={styles.modalImage} />
            </MB_Modal>

            <Pressable disabled={props.disableInteraction} onPress={onImagePressed} style={[styles.pressableWrapper]}>
                {({ hovered }: IMB_PressableState) => {
                    props.onHoverChange?.(hovered);

                    animateImage(hovered || props.activateHover ? 1 : 0);

                    return (
                        <Animated.Image {...imageProps} style={[styles.imageStyle, grayscaleStyle, { transform: [{ scale: hoverScaleAnimation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }] }]} />
                    );
                }}
            </Pressable>
        </View>

    );
};

export { MB_Image };

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    pressableWrapper: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    modalWrapper: {
        width: '100%',
        height: '100%',
        padding: 96,
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: '100%',
    },
});

