import React from 'react';
import { ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { EksperienceLogoWithText } from '../../resources/svgComponents/EksperienceLogoWithText';


const EksperienceLogoButton = ({ containerStyle, onPressCallback, width, height, color }: { containerStyle?: StyleProp<ViewStyle>, onPressCallback?: () => void, width?: number, height?: number, color?: string }) => {
    return (
        <TouchableOpacity style={containerStyle} onPress={onPressCallback}>
            <EksperienceLogoWithText width={width} height={height} color={color} />
        </TouchableOpacity>
    );
};

export { EksperienceLogoButton };
