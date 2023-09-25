import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle, TextInput } from 'react-native';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { EksperienceLogoWithText } from '../../resources/svgComponents/EksperienceLogoWithText';
import { version } from '../../../version';
import { MB_Modal } from '../../mightyByteLibraries/MB_Modal/MB_Modal';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';


const Footer = React.memo(({ containerStyle }: { containerStyle?: StyleProp<ViewStyle> }) => {

    // TODO: OnSched: Delete all the modal stuff here that was used for testing
    const [isDebugModalVisible, setIsDebugModalVisible] = useState(false);
    const [backdropBlurTint, setBackdropBlurTint] = useState<'light' | 'dark' | 'default'>('default');
    const [backdropBlurIntensity, setBackdropBlurIntensity] = useState<string>('20');
    const [backdropColor, setBackdropColor] = useState<string>('000000');
    const [backdropOpacity, setBackdropOpacity] = useState<string>('70');

    const backdropIntensityNumber = backdropBlurIntensity && !isNaN(Number(backdropBlurIntensity)) && Number(backdropBlurIntensity) >= 0 && Number(backdropBlurIntensity) <= 100 ? Number(backdropBlurIntensity) : 20;
    const backdropOpacityNumber = backdropOpacity && !isNaN(Number(backdropOpacity)) && Number(backdropOpacity) >= 0 && Number(backdropOpacity) <= 100 ? Number(backdropOpacity) : 20;

    return (
        <View style={[styles.container, containerStyle]}>

            <MB_Modal
                isVisible={isDebugModalVisible}
                onDismiss={() => setIsDebugModalVisible(false)}
                backdropBlurTint={backdropBlurTint}
                backdropBlurIntensity={backdropIntensityNumber}
                backdropColor={'#' + backdropColor}
                backdropOpacity={backdropOpacityNumber / 100}
            >
                <View style={{ width: 500, height: 300, backgroundColor: COLORS.darkPurple, borderRadius: 10, padding: 32 }}>
                    <Text style={textStyles.largeText}>Debug modal for selecting characteristics</Text>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 16 }}>
                        <Text style={[textStyles.normalText, { marginEnd: 8 }]}>Blur Intensity: </Text>
                        <TextInput
                            style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#000000', width: 200, height: 28 }}
                            value={backdropBlurIntensity.toString()}
                            onChangeText={newText => {
                                const newTextCleared = newText.replace(/[^0-9]/g, '');
                                if (newTextCleared.length <= 3) {
                                    setBackdropBlurIntensity(newTextCleared);
                                }
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 16 }}>
                        <MB_Button
                            style={{ marginEnd: 16, borderWidth: 1, borderColor: '#000', backgroundColor: backdropBlurTint === 'light' ? '#0000ff' : 'transparent' }}
                            title="Blur Tint light"
                            onPress={() => setBackdropBlurTint('light')}
                        />
                        <MB_Button
                            style={{ marginEnd: 16, borderWidth: 1, borderColor: '#000', backgroundColor: backdropBlurTint === 'default' ? '#0000ff' : 'transparent' }}
                            title="Blur Tint default"
                            onPress={() => setBackdropBlurTint('default')}
                        />
                        <MB_Button
                            style={{ borderWidth: 1, borderColor: '#000', backgroundColor: backdropBlurTint === 'dark' ? '#0000ff' : 'transparent' }}
                            title="Blur Tint dark"
                            onPress={() => setBackdropBlurTint('dark')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                        <View style={{ width: '49%' }}>
                            <Text style={[textStyles.smallerText, { marginEnd: 8, textAlign: 'left', flex: 1 }]}>Backdrop color HEX: </Text>
                            <TextInput
                                style={{ marginTop: 8, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#000000', width: 100 }}
                                value={backdropColor}
                                onChangeText={newText => {
                                    const newTextCleared = newText.replace(/[^0-9A-Fa-f]/g, '');
                                    if (newTextCleared.length <= 6) {
                                        setBackdropColor(newTextCleared);
                                    }
                                }}
                            />
                        </View>

                        <View style={{ width: '50%' }}>
                            <Text style={[textStyles.smallerText, { marginEnd: 8, textAlign: 'left', flex: 1 }]}>Backdrop Opacity: (0% - 100%) </Text>
                            <TextInput
                                style={{ marginTop: 8, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#000000', width: 100 }}
                                value={backdropOpacity}
                                onChangeText={newText => {
                                    const newTextCleared = newText.replace(/[^0-9]/g, '');
                                    if (newTextCleared.length <= 3) {
                                        setBackdropOpacity(newTextCleared);
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </MB_Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{}}>
                    <EksperienceLogoWithText />
                    <Text style={[textStyles.largeText, { fontSize: 22, textAlign: 'left', marginTop: 36 }]}>team@eksperience.net</Text>
                    <Text style={[textStyles.largeText, { fontSize: 22, textAlign: 'left', marginTop: 18 }]}>Phone: +1 310-878-2936</Text>
                    <View style={styles.socialMediaIconsContainer}>
                        <MB_Button
                            title=""
                            onPress={() => { }}
                            style={{ paddingVertical: 4, paddingStart: 6, paddingEnd: 0, marginEnd: 22, backgroundColor: 'transparent' }}
                            iconStyle={{ margin: 0 }}
                            icon={<FontAwesome name="facebook" size={23} color={COLORS.white} />}
                        />
                        <MB_Button
                            title=""
                            onPress={() => { }}
                            style={{ paddingVertical: 4, paddingStart: 6, paddingEnd: 0, marginEnd: 22, backgroundColor: 'transparent' }}
                            iconStyle={{ margin: 0 }}
                            icon={<AntDesign name="instagram" size={23} color={COLORS.white} />}
                        />
                        <MB_Button
                            title=""
                            onPress={() => { }}
                            style={{ paddingVertical: 4, paddingStart: 6, paddingEnd: 0, backgroundColor: 'transparent' }}
                            iconStyle={{ margin: 0 }}
                            icon={<AntDesign name="twitter" size={23} color={COLORS.white} />}
                        />
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={[textStyles.largerText, { fontSize: 20, textAlign: 'left' }]}>Company</Text>
                    <MB_Button
                        title="About Us"
                        onPress={() => { }}
                        style={{ marginTop: 42, paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                    <MB_Button
                        title="Contact"
                        onPress={() => { }}
                        style={{ paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                    <MB_Button
                        title="FAQ"
                        onPress={() => { }}
                        style={{ paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={[textStyles.largerText, { fontSize: 20, textAlign: 'left', width: '100%' }]}>Legal</Text>
                    <MB_Button
                        title="Terms of Service"
                        onPress={() => { }}
                        style={{ marginTop: 42, paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                    <MB_Button
                        title="Privacy Policy"
                        onPress={() => { }}
                        style={{ paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                    <MB_Button
                        title="Show Debug Modal"
                        onPress={() => setIsDebugModalVisible(true)}
                        style={{ paddingHorizontal: 0, alignSelf: 'flex-start', backgroundColor: 'transparent' }}
                        textStyle={[textStyles.normalText, { fontSize: 18 }]}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={[textStyles.largerText, { fontSize: 20, textAlign: 'left' }]}>Available at</Text>
                    <AntDesign name="chrome" size={30} color={COLORS.white} style={styles.availableAtLogo} />
                </View>
            </View>

            <Text style={[textStyles.normalText, { fontSize: 18, marginTop: 110 }]}>© 2021 Eksperience</Text>

            <Text style={[textStyles.smallText, { alignSelf: 'flex-end' }]}>Version: {version}</Text>
            <Text style={[textStyles.smallText, { alignSelf: 'flex-end' }]}>Mode: {process.env.NODE_ENV}, isDev: {__DEV__?.toString()}</Text>
            <Text style={[textStyles.smallText, { alignSelf: 'flex-end' }]}>Server Version: 0.0.1</Text>
        </View>
    );
});

export { Footer };


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.darkPurple,
        paddingTop: 75,
        paddingBottom: 37,
        paddingHorizontal: 52,
        alignSelf: 'stretch',
        marginTop: 128,
    },
    socialMediaIconsContainer: {
        marginTop: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    availableAtLogo: {
        paddingHorizontal: 14,
        paddingVertical: 12.5,
        borderRadius: 300,
        borderWidth: 1,
        borderColor: COLORS.white,
        marginTop: 32,
    },
});
