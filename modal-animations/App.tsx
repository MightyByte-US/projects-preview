import 'react-native-gesture-handler';

import React from 'react';
import { useFontLoader } from './src/utils/fontLoader';
import { SignedInStatusProvider } from './src/context/SignedInContext';
import RootNavigation from './src/navigators/RootNavigator';
import { MB_DialogueContextProvider } from './src/mightyByteLibraries/MB_Dialogue/MB_DialogueContext';
import { MB_Dialogue } from './src/mightyByteLibraries/MB_Dialogue/MB_Dialogue';
import { COLORS } from './src/constants/colors';
import { StyleSheet } from 'react-native';
import { textStyles } from './src/constants/textStyles';


const App = () => {
  useFontLoader();

  return (
    <SignedInStatusProvider>
      <MB_DialogueContextProvider>
        <RootNavigation />

        <MB_Dialogue
          defaultContainerStyle={styles.modalPopUpDefaultContainer}
          defaultTitleStyle={styles.modalPopUpDefaultTitle}
          defaultMessageStyle={styles.modalPopUpDefaultMessage}
          defaultPrimaryButtonStyle={styles.modalPopUpDefaultPrimaryButton}
          defaultSeconaryButtonStyle={styles.modalPopUpDefaultSecondaryButton}
          defaultButtonsContainerStyleModifier={styles.modalPopUpDefaultButtonsContainerModifier}
        />
      </MB_DialogueContextProvider>
    </SignedInStatusProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  modalPopUpDefaultContainer: {
    backgroundColor: COLORS.darkPurple,
    borderRadius: 10,
    paddingTop: 40,
    paddingHorizontal: 76,
    paddingBottom: 44,
  },
  modalPopUpDefaultTitle: StyleSheet.flatten([
    textStyles.largerText, {
      fontWeight: '600',
    },
  ]),
  modalPopUpDefaultMessage: StyleSheet.flatten([
    textStyles.normalText, {
      fontWeight: '400',
      marginTop: 18,
      color: COLORS.lighterGray,
    },
  ]),
  modalPopUpDefaultPrimaryButton: {
    height: 58,
    minWidth: 168,
    alignSelf: 'center',
    backgroundColor: COLORS.plum,
  },
  modalPopUpDefaultSecondaryButton: {
    height: 58,
    minWidth: 168,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.dimViolet,
  },
  modalPopUpDefaultButtonsContainerModifier: {
    marginTop: 48,
  },
});
