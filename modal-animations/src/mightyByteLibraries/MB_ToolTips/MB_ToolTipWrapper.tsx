import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRef } from 'react';



export enum TOOLTIP_POSITION {
    bottom,
    left,
}

interface IMB_ToolTipWrapper {
    containerStyle?: StyleProp<ViewStyle>,
    children: React.ReactNode,
    arrowStyle?: StyleProp<ViewStyle>,
    arrowColor?: string,
    arrowSize?: number,
    arrowDirection?: TOOLTIP_POSITION,
}

const ARROW_NAMES = {
    [TOOLTIP_POSITION.bottom]: 'caretup',
    [TOOLTIP_POSITION.left]: 'caretright',
};

const MB_ToolTipWrapper = ({ containerStyle, children, arrowStyle, arrowColor, arrowSize, arrowDirection = TOOLTIP_POSITION.bottom }: IMB_ToolTipWrapper) => {
    const toolTipRef = useRef<View | null>(null);

    const arrowPosition = (): StyleProp<ViewStyle> => {
        if (arrowDirection === TOOLTIP_POSITION.bottom) {
            return { top: -14 };
        }
        else if (arrowDirection === TOOLTIP_POSITION.left) {
            return { right: -12, top: '45%' };
        }
    };

    return (
        <View style={[styles.container, containerStyle]} ref={toolTipRef}>
            <AntDesign name={ARROW_NAMES[arrowDirection]} color={arrowColor ?? COLORS.white} size={arrowSize ?? 21} style={[{ position: 'absolute' }, arrowPosition(), arrowStyle]} />
            {children}
        </View>
    );
};

export { MB_ToolTipWrapper };

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: 'white',
    },
});
