import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';
import { UniversalProps } from '../../typesInterfacesEnums/componentProps';

const NotFound = ({ navigation }: UniversalProps) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const viewWidthChanged = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        if (width < 585 && !isSmallScreen) {
            setIsSmallScreen(true);
        } else if (width >= 585 && isSmallScreen) {
            setIsSmallScreen(false);
        }
    };

    return (
        <View style={styles.container} onLayout={viewWidthChanged}>
            <View style={styles.innerContainer}>
                <Text style={[textStyles.normalText, { fontSize: 20, marginTop: 53 }]}>
                    We can't seem to find the page{'\n'}you're looking for.
                </Text>

                <MB_Button
                    title="Back to home page"
                    style={styles.backToHomeButton}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: navigation.getState().routeNames[0] }],
                        });
                    }}
                />
            </View>
        </View>
    );
};

export { NotFound };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.englishViolet,
        alignItems: 'center',
        padding: 32,
    },
    innerContainer: {
        top: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backToHomeButton: {
        width: 268,
        height: 63,
        marginTop: 23,
        backgroundColor: COLORS.plum,
    },
});
