import React from 'react';
import { View, StyleProp, ViewStyle, Pressable, GestureResponderEvent } from 'react-native';
import { COLORS } from '../../constants/colors';
import { IMB_PressableStateCallbackType } from '../../typesInterfacesEnums/typesAndInterfaces';

interface IMB_OnHoverWrapper {
    children: React.ReactNode | ((arg: IMB_PressableStateCallbackType) => React.ReactNode),
    wrapperStyle?: StyleProp<ViewStyle>,
    onHoverWrapperStyleModifier?: StyleProp<ViewStyle>,
    onPress?: (vent: GestureResponderEvent) => void,
}

const MB_OnHoverWrapper = (props: IMB_OnHoverWrapper) => {
    return (
        <Pressable onPress={props.onPress}>
            {(pressableState: IMB_PressableStateCallbackType) => {
                const onHoverStyle = !pressableState.hovered ? {} : props.onHoverWrapperStyleModifier ?? { backgroundColor: COLORS.black };

                return (
                    <View style={[props.wrapperStyle, onHoverStyle]}>
                        {typeof props.children === 'function' ?
                            <>{props.children(pressableState)}</>
                            :
                            <>{props.children}</>
                        }
                    </View>
                );
            }}
        </Pressable>
    );
};

export default React.memo(MB_OnHoverWrapper);
