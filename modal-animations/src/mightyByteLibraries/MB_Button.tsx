import React, { ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { textStyles } from '../constants/textStyles';

export interface IMB_ButtonProps {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactElement | string;
  iconStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactElement | string;
  rightIconStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  activityIndicatorColor?: string;
}

/**
 *
 * @param title Optional string: Title of the button
 * @param onPress () => void: onPress action of the button that will be fired when pressed
 * @param style Optional StyleProp<ViewStyle>: Style of the button container
 * @param textStyle Optional StyleProp<TextStyle>: Style of the button title
 * @param icon Optional ReactElement | string: Left icon of the button
 * @param iconStyle Optional StyleProp<ViewStyle>: Style of the left icon
 * @param rightIcon Optional ReactElement | string: Right icon of the button
 * @param rightIconStyle Optional StyleProp<ViewStyle>: Style of the right icon
 * @param loading Optional boolean: If true, will hide the content of the button and will show a loading spinner
 * @param disabled Optinal boolean: Disables the button if set to true and by default reduces it`s opacity to 0.2
 * @param activityIndicatorColor Optional string: The color of the loading activity indicator
 * @returns
 */
export const MB_Button = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  loading = false,
  disabled = false,
  iconStyle,
  activityIndicatorColor,
  rightIcon,
  rightIconStyle,
}: IMB_ButtonProps): ReactElement => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[styles.customizableButtonContainer, { opacity: disabled ? 0.2 : 1 }, style]}>
    {icon && (
      <View
        style={[{ marginRight: 8 }, styles.iconWrapper, iconStyle]}
        importantForAccessibility="no"
        accessible={false}>
        {icon}
      </View>
    )}
    {loading ? (
      <ActivityIndicator
        size="small"
        color={activityIndicatorColor ?? '#ffffff'}
      />
    ) : (
      <>
        {title !== undefined && <Text style={[textStyles.normalText, textStyle]}>{title}</Text>}
      </>
    )}
    {rightIcon && (
      <View
        style={[rightIconStyle, styles.iconWrapper, { marginLeft: 8 }]}
        importantForAccessibility="no"
        accessible={false}>
        {rightIcon}
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  customizableButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0000ff',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
