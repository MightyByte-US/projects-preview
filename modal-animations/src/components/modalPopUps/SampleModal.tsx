import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { MB_Modal, MB_ModalAnimations } from '@mightybyte/rnw.components.modal';

interface SampleModalProps {
  isVisible: boolean,
  onDismiss: () => void,
  textToShow: string,
  animationIn?: MB_ModalAnimations
  animationOut?: MB_ModalAnimations
}

const SampleModal = ({ isVisible, onDismiss, textToShow, animationIn, animationOut }: SampleModalProps) => {
  return (
    <MB_Modal
      isVisible={isVisible}
      onDismiss={onDismiss}
      animationIn={animationIn}
      animationOut={animationOut}
    >
      <View style={styles.popupContainer}>
        <Text style={textStyles.largeText}>{textToShow}</Text>
      </View>
    </MB_Modal>
  );
};

export { SampleModal };

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: COLORS.darkPurple,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
  },
});
