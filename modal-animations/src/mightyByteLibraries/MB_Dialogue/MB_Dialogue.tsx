import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MB_Button } from '../MB_Button';
import { MB_Modal } from '../MB_Modal/MB_Modal';
import { IShowPopUp, MB_DialogueContext } from './MB_DialogueContext';


interface IMB_DialogueProps {
  defaultContainerStyle?: StyleProp<ViewStyle>,
  defaultTitleStyle?: StyleProp<TextStyle>,
  defaultMessageStyle?: StyleProp<TextStyle>,
  defaultPrimaryButtonStyle?: StyleProp<ViewStyle>,
  defaultSeconaryButtonStyle?: StyleProp<ViewStyle>,
  defaultButtonsContainerStyleModifier?: StyleProp<ViewStyle>
  defaultTopComponentWrapperStyle?: StyleProp<ViewStyle>
  defaultMiddleComponentWrapperStyle?: StyleProp<ViewStyle>
}

export let MB_DialogueShow: (props: IShowPopUp) => void = () => { };
export let MB_DialogueHide: () => void = () => { };

export const MB_Dialogue = ({
  defaultContainerStyle,
  defaultTitleStyle,
  defaultMessageStyle,
  defaultPrimaryButtonStyle,
  defaultSeconaryButtonStyle,
  defaultButtonsContainerStyleModifier,
  defaultTopComponentWrapperStyle,
  defaultMiddleComponentWrapperStyle,
}: IMB_DialogueProps) => {
  const {
    state: {
      isVisible, title, titleStyle, message, messageStyle, topComponent,
      middleComponent, buttonText, buttonAction, secondaryButtonText, secondaryButtonAction,
    },
    hidePopUp: _hidePopUp,
    showPopUp: _showPopUp,
  } = useContext(MB_DialogueContext);

  MB_DialogueHide = _hidePopUp;
  MB_DialogueShow = _showPopUp;

  const [isVisibleInternal, setIsVisibleInternal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsVisibleInternal(true);
    }
  }, [isVisible]);

  if (!isVisibleInternal) { return null; }

  return (
    <MB_Modal
      isVisible={isVisible}
      onModalHide={() => setIsVisibleInternal(false)}
      hideCloseButton
    >
      <View style={defaultContainerStyle ?? styles.popUpView}>
        {topComponent &&
          <View style={defaultTopComponentWrapperStyle ?? styles.topComponentWrapperStyle}>
            {typeof topComponent === 'function' ? topComponent() : topComponent}
          </View>
        }

        <Text style={titleStyle ?? defaultTitleStyle ?? styles.titleText}>{title}</Text>

        {middleComponent &&
          <View style={defaultMiddleComponentWrapperStyle ?? styles.middleComponentWrapperStyle}>
            {typeof middleComponent === 'function' ? middleComponent() : middleComponent}
          </View>
        }

        {message && <Text style={messageStyle ?? defaultMessageStyle ?? styles.messageText}>{message}</Text>}

        <View style={[styles.buttonsContainer, defaultButtonsContainerStyleModifier]}>

          {secondaryButtonText &&
            <>
              <MB_Button
                style={defaultSeconaryButtonStyle ?? styles.secondaryButtonStyle}
                title={secondaryButtonText ? secondaryButtonText : 'cancel'}
                onPress={() => (secondaryButtonAction ? secondaryButtonAction() : _hidePopUp())}
              />

              <View style={{ width: 32 }} />
            </>
          }
          <MB_Button
            style={defaultPrimaryButtonStyle ?? styles.primaryButtonStyle}
            title={buttonText ? buttonText : 'Cancel'}
            onPress={() => (buttonAction ? buttonAction() : _hidePopUp())}
          />
        </View>
      </View>
    </MB_Modal>
  );
};

const styles = StyleSheet.create({
  popUpView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    lineHeight: 22,
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
  errorImage: {
    width: 50,
    height: 50,
  },

  primaryButtonStyle: {
    minWidth: 168,
  },
  secondaryButtonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    minWidth: 168,
  },
  topComponentWrapperStyle: {
    alignItems: 'center',
    marginBottom: 32,
  },
  middleComponentWrapperStyle: {
    alignItems: 'center',
    marginTop: 18,
  },
});
