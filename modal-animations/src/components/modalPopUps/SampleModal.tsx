import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { MB_Modal } from '../../mightyByteLibraries/MB_Modal/MB_Modal';


const SampleModal = ({ isVisible, onDismiss, textToShow }: { isVisible: boolean, onDismiss: () => void, textToShow: string }) => {
  return (
    <MB_Modal isVisible={isVisible} onDismiss={onDismiss}>
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
