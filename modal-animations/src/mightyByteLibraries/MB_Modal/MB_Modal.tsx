import React, { useRef, useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, PanResponderGestureState, GestureResponderEvent, Platform, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReactNativeModal, { OnOrientationChange, OnSwipeCompleteParams, PresentationStyle, Direction } from 'react-native-modal';
import * as animatable from 'react-native-animatable';
import { applyTransparency, COLORS } from '../../constants/colors';
import { BlurView } from 'expo-blur';
import { IMB_ButtonProps, MB_Button } from '../MB_Button';

export type TMB_ModalAnimations = 'bounce' | 'flash' | 'jello' | 'pulse' | 'rotate' | 'rubberBand' | 'shake' | 'swing' | 'tada' | 'wobble' | 'bounceIn' | 'bounceInDown' | 'bounceInUp' | 'bounceInLeft' | 'bounceInRight' | 'bounceOut' | 'bounceOutDown' | 'bounceOutUp' | 'bounceOutLeft' | 'bounceOutRight' | 'fadeIn' | 'fadeInDown' | 'fadeInDownBig' | 'fadeInUp' | 'fadeInUpBig' | 'fadeInLeft' | 'fadeInLeftBig' | 'fadeInRight' | 'fadeInRightBig' | 'fadeOut' | 'fadeOutDown' | 'fadeOutDownBig' | 'fadeOutUp' | 'fadeOutUpBig' | 'fadeOutLeft' | 'fadeOutLeftBig' | 'fadeOutRight' | 'fadeOutRightBig' | 'flipInX' | 'flipInY' | 'flipOutX' | 'flipOutY' | 'lightSpeedIn' | 'lightSpeedOut' | 'slideInDown' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'slideOutDown' | 'slideOutUp' | 'slideOutLeft' | 'slideOutRight' | 'zoomIn' | 'zoomInDown' | 'zoomInUp' | 'zoomInLeft' | 'zoomInRight' | 'zoomOut' | 'zoomOutDown' | 'zoomOutUp' | 'zoomOutLeft' | 'zoomOutRight' | animatable.CustomAnimation<import('react-native').TextStyle & ViewStyle & import('react-native').ImageStyle>

type IMB_Modal = {
    children?: React.ReactNode
    childrenWrapperStyle?: StyleProp<ViewStyle>
    hideCloseButton?: boolean
    closeButtonProps?: IMB_ButtonProps
    isVisible: boolean
    modalStyle?: StyleProp<ViewStyle>
    disableBackdropBlur?: boolean,
    backdropBlurIntensity?: number,
    backdropBlurTint?: 'light' | 'dark' | 'default'
    backdropBlurStyle?: StyleProp<ViewStyle>

    // IMPORTANT: If you just want to detect if the modal was dismissed, use onDismiss instead
    // onCloseButtonPressed is called before the dismiss animation happens and is intended
    // to detect that modal closed because of user pressing the close button.
    onCloseButtonPressed?: () => void

    // Unless this is set, children components are removed when the modal closes
    keepChildrenAfterDismiss?: boolean,

    // Modal Props
    propogateSwipe?: boolean | ((event: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean)
    animationIn?: TMB_ModalAnimations
    animationInTiming?: number;
    animationOut?: TMB_ModalAnimations
    animationOutTiming?: number;
    avoidKeyboard?: boolean
    coverScreen?: boolean
    backdropColor?: string
    backdropOpacity?: number
    customBackdrop?: React.ReactNode
    onDismiss?: (isVisible: false) => void
    onShow?: () => void
    onModalShow?: () => void;
    onModalWillShow?: () => void;
    onModalHide?: () => void;
    onModalWillHide?: () => void;
    onBackdropPress?: () => void;
    onBackButtonPress?: () => void;
    onSwipeStart?: (gestureState: PanResponderGestureState) => void;
    onSwipeMove?: (percentageShown: number, gestureState: PanResponderGestureState) => void;
    onSwipeComplete?: (params: OnSwipeCompleteParams, gestureState: PanResponderGestureState) => void;
    onSwipeCancel?: (gestureState: PanResponderGestureState) => void;
    useNativeDriver?: boolean
    hideModalContentWhileAnimating?: boolean
    presentationStyle?: PresentationStyle
    onOrientationChange?: OnOrientationChange
    closeOnBackdropPress?: boolean,
    swipeDirection?: Direction | Array<Direction>;
}

const MB_Modal = (props: IMB_Modal) => {
    const reactNativeModalRef = useRef<ReactNativeModal>(null);

    const [dismissInProgress, setDismissInProgress] = useState(false);

    const onCloseButtonOrBackdropPressed = React.useCallback((isBackdrop?: boolean) => {
        if (!isBackdrop || isBackdrop && props.closeOnBackdropPress) {
            setDismissInProgress(true);
            reactNativeModalRef.current?.close();
        }

        if (isBackdrop) {
            props.onBackdropPress?.();
        } else {
            props.onCloseButtonPressed?.();
        }
    }, [props]);

    const getChildren = React.useMemo(() => {
        return (
            <View style={[styles.childrenWrapper, props.childrenWrapperStyle]}>
                <TouchableOpacity
                    disabled={!props.closeOnBackdropPress && !props.onBackdropPress}
                    activeOpacity={1}
                    style={styles.customBackdropTouchable}
                    onPress={() => onCloseButtonOrBackdropPressed(true)}
                />
                {props.children}
            </View>
        );
    }, [onCloseButtonOrBackdropPressed, props.children, props.childrenWrapperStyle, props.closeOnBackdropPress, props.onBackdropPress]);

    return (
        <ReactNativeModal
            ref={reactNativeModalRef}
            animationIn={props.animationIn}
            animationInTiming={props.animationInTiming ?? 300}
            animationOut={props.animationOut}
            animationOutTiming={props.animationOutTiming}
            avoidKeyboard={props.avoidKeyboard ?? false}
            coverScreen={props.coverScreen ?? true}
            hasBackdrop={false}
            backdropColor={props.backdropColor ?? 'black'}
            backdropOpacity={props.backdropOpacity ?? 0.7}
            customBackdrop={props.customBackdrop}
            isVisible={dismissInProgress ? false : props.isVisible}
            onModalShow={props.onModalShow}
            onModalWillShow={props.onModalWillShow}
            onModalHide={() => {
                setDismissInProgress(false);
                props.onDismiss?.(false);
                props.onModalHide?.();
            }}
            onModalWillHide={props.onModalWillHide}
            onBackdropPress={props.onBackdropPress}
            onBackButtonPress={props.onBackButtonPress}
            onSwipeStart={props.onSwipeStart}
            onSwipeMove={props.onSwipeMove}
            onSwipeComplete={props.onSwipeComplete}
            onSwipeCancel={props.onSwipeCancel}
            useNativeDriver={props.useNativeDriver ?? Platform.OS === 'web' ? false : true}
            useNativeDriverForBackdrop={props.useNativeDriver ?? Platform.OS === 'web' ? false : true}
            hideModalContentWhileAnimating={props.hideModalContentWhileAnimating ?? false}
            propagateSwipe={props.propogateSwipe ?? true}
            style={[styles.modalStyle, props.modalStyle]}
            onShow={props.onShow}
            presentationStyle={props.presentationStyle}
            onOrientationChange={props.onOrientationChange}
            swipeDirection={props.swipeDirection}
        >
            <View style={{ flex: 1, backgroundColor: props.customBackdrop || props.disableBackdropBlur ? 'transparent' : applyTransparency(props.backdropColor ?? COLORS.black, props.backdropOpacity ?? 0.7) }}>
                {props.customBackdrop || props.disableBackdropBlur ?
                    <>
                        {getChildren}
                    </>
                    :
                    <BlurView
                        intensity={props.backdropBlurIntensity ?? 20}
                        tint={props.backdropBlurTint ?? 'default'}
                        style={[{ flex: 1 }]}
                    >
                        {getChildren}
                    </BlurView>
                }
            </View>

            {!props.hideCloseButton &&
                <MB_Button
                    title=""
                    rightIcon={<Feather name="x" color={COLORS.white} size={32} />}
                    onPress={() => onCloseButtonOrBackdropPressed()}
                    style={{ position: 'absolute', right: 55, top: 55, backgroundColor: 'transparent', zIndex: 1 }}
                    {...props.closeButtonProps}
                />
            }

        </ReactNativeModal>
    );
};

export { MB_Modal };

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        flex: 1,
    },
    childrenWrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    customBackdropTouchable: StyleSheet.flatten([{
        height: '100%',
        width: '100%',
        position: 'absolute',
    }, Platform.OS === 'web' ? {
        cursor: 'default',
    } : {

    }]),
});
