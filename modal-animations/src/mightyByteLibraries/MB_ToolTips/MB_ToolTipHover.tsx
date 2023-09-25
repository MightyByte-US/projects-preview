import React, { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { MB_Pressable } from '../MB_Pressable';


interface IMB_ToolTip {
    children: React.ReactNode
    toolTipElement: React.ReactElement
    disableShadow?: boolean
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
    childContentSpacing?: number
    childWrapperStyle?: StyleProp<ViewStyle>
    wrapperStyle?: StyleProp<ViewStyle>
    backgroundColor?: string
}

const MB_ToolTipHover = ({ childContentSpacing, placement, disableShadow, children, toolTipElement, childWrapperStyle, wrapperStyle, backgroundColor }: IMB_ToolTip) => {
    const [isToolTipVisible, setIsToolTipVisible] = useState(false);
    return (
        <View style={[{ alignSelf: 'flex-start' }, wrapperStyle]}>
            <Tooltip
                isVisible={isToolTipVisible}
                content={toolTipElement}
                placement={placement ?? 'top'}
                childContentSpacing={childContentSpacing ?? 4}
                displayInsets={{ left: 0, top: 0, right: 0, bottom: 0 }}
                disableShadow={disableShadow ?? true}
                onClose={() => setIsToolTipVisible(false)}
                backgroundColor={backgroundColor}
            >
                <TooltipChildrenContext.Consumer>
                    {({ tooltipDuplicate }) => {
                        return (
                            <MB_Pressable
                                style={childWrapperStyle}
                                onHoverIn={() => {
                                    if (!tooltipDuplicate) {
                                        setIsToolTipVisible(true);
                                    }
                                }}
                                onHoverOut={() => {
                                    if (tooltipDuplicate) {
                                        setIsToolTipVisible(false);
                                    }
                                }}
                            >
                                <View>
                                    {children}
                                </View>
                            </MB_Pressable>
                        );
                    }}
                </TooltipChildrenContext.Consumer>



            </Tooltip>
        </View>
    );
};

export { MB_ToolTipHover };
