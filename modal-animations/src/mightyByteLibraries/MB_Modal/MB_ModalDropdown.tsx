import React, { ReactNode } from 'react';
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MB_Modal, TMB_ModalAnimations } from './MB_Modal';

interface MB_DialogueProps {
    visible: boolean,
    children: ReactNode,
    style?: StyleProp<ViewStyle>,
    callerX: number,
    callerY: number,
    callerWidth: number,
    callerHeight: number,
    onClose?: () => void,
    animationIn?: TMB_ModalAnimations
    animationOut?: TMB_ModalAnimations
}

const MB_ModalDropdown = ({ children, visible, style, onClose, callerX, callerY, callerWidth, callerHeight, animationIn, animationOut }: MB_DialogueProps) => {

    const modalPosition = () => {
        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;
        const modalHeight = (style && StyleSheet.flatten(style).height) || (33 + StyleSheet.hairlineWidth) * 5;
        const bottomSpace = windowHeight - callerY - callerHeight;
        const rightSpace = windowWidth - callerX;
        const showInBottom = bottomSpace >= modalHeight || bottomSpace >= callerY;
        const showInLeft = rightSpace >= callerX;
        const position: {
            height?: number | string,
            top?: number,
            left?: number,
            width?: number | string,
            right?: number
        } = {
            height: modalHeight,
            top: showInBottom
                ? callerY + callerHeight
                : Math.max(0, callerY - Number(modalHeight)),
        };
        if (showInLeft) {
            position.left = callerX;
        } else {
            const modalWidth = (style && StyleSheet.flatten(style).width) || -1;
            if (modalWidth !== -1) {
                position.width = modalWidth;
            }
            position.right = rightSpace - callerWidth;
        }
        return position;
    };

    return (
        <MB_Modal
            isVisible={visible}
            onDismiss={onClose}
            disableBackdropBlur
            closeOnBackdropPress
            hideCloseButton
            animationIn={animationIn ?? 'fadeIn'}
            animationOut={animationOut ?? 'fadeOut'}
        >
            <View style={[style, { position: 'absolute' }, modalPosition()]}>
                {children}
            </View>
        </MB_Modal>
    );
};

export { MB_ModalDropdown };
