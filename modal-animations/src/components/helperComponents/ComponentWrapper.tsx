import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Header, IHeaderOptions } from '../helperComponents/Header';
import { Footer } from '../helperComponents/Footer';
import { LinearGradientBackground } from '../helperComponents/LinearGradientBackground';

// TODO: Show 404 with member not found if the request fails

interface IComponentWrapperProps {
    children: React.ReactNode
    headerOptions?: IHeaderOptions
    headerChildren?: React.ReactNode
    containerStyle?: StyleProp<ViewStyle>
    innerContainerStyle?: StyleProp<ViewStyle>
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined
    onInnerComponentLayout?: ((event: LayoutChangeEvent) => void) | undefined
    disableFooter?: boolean
}


const ComponentWrapper = (props: IComponentWrapperProps) => {

    return (
        <View style={[styles.container, props.containerStyle]} onLayout={props.onLayout}>

            <LinearGradientBackground />

            <View style={[styles.innerContainer, props.innerContainerStyle]} onLayout={props.onInnerComponentLayout}>

                <Header options={props.headerOptions}>
                    {props.headerChildren}
                </Header>

                {props.children}
            </View>

            {!props.disableFooter &&
                <Footer />
            }
        </View>
    );
};

export { ComponentWrapper };

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: COLORS.englishViolet,
        justifyContent: 'space-between',
    },
    innerContainer: {
        maxWidth: 1680,
        paddingHorizontal: 54,
        alignSelf: 'center',
        width: '100%',
    },
});
