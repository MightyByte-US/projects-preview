import React, { ReactNode, useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, TextInput, Text, StyleProp, ViewStyle, Pressable, Platform } from 'react-native';
import { applyTransparency, COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { EksperienceLogoButton } from './EksperienceLogoButton';
import { SignedInContext, SIGNED_IN_STATUS } from '../../context/SignedInContext';
import { UniversalScreenNavigationProp } from '../../typesInterfacesEnums/componentProps';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';
import { USER_TYPES } from '../../typesInterfacesEnums/enums';

export interface IHeaderOptions {
    showSearchBar?: boolean
}

interface IHeader {
    containerStyle?: StyleProp<ViewStyle>,
    setSearchText?: React.Dispatch<React.SetStateAction<string>>,
    options?: IHeaderOptions,
    children?: ReactNode
}

const Header = React.memo(({ containerStyle, setSearchText, options, children }: IHeader) => {
    const navigation = useNavigation<UniversalScreenNavigationProp>();

    const { isSignedIn, userType, setSignedInStatus } = useContext(SignedInContext);

    return (
        <View>
            <View style={[styles.container, containerStyle]}>
                <View style={{ paddingVertical: 4, minWidth: 450, flex: 1, flexDirection: 'row' }}>
                    <EksperienceLogoButton onPressCallback={() => navigation.navigate('Login')} />
                    {options?.showSearchBar &&
                        <View style={styles.searchBarContainer}>
                            <AntDesign name="search1" size={20} color={COLORS.lightGray} style={{ marginStart: 16 }} />
                            <TextInput style={[textStyles.normalText, { textAlign: 'left', marginStart: 8 }]} onChangeText={setSearchText} />
                        </View>
                    }
                    {children}
                </View>

                {!isSignedIn ?
                    <Pressable onPress={() => navigation.navigate('Login')} >
                        <Text style={styles.loginButton} >Login</Text>
                    </Pressable>
                    :
                    <MB_Button
                        title={'Signed in as a ' + userType + ' (click here to logout)'}
                        onPress={() => setSignedInStatus({ isSignedIn: SIGNED_IN_STATUS.signedOut, userType: USER_TYPES.guest })}
                    />
                }
            </View>
        </View>
    );
});

export { Header };

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 31,
    },
    searchBarContainer: {
        flexDirection: 'row',
        height: 44,
        marginStart: 36,
        borderRadius: 8,
        minWidth: 200,
        backgroundColor: applyTransparency(COLORS.white, 0.14),
        alignItems: 'center',
        maxWidth: 480,
        flex: 1,
    },
    loginButton: StyleSheet.flatten([
        textStyles.normalText, {
            fontWeight: '400',
        }, Platform.OS === 'web' && {
            cursor: 'pointer',
        },
    ]),
});
