import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const UseAccessCodeIcon = React.memo((props: { width?: number, height?: number, color?: string, containerStyle?: StyleProp<ViewStyle> }) => {
    return (
        <View style={props.containerStyle}>
            <Svg
                width={props.width ?? 46}
                height={props.height ?? 23}
                viewBox="0 0 46 23"
                fill={props.color ?? '#fff'}
            >
                <Rect
                    x={1.4}
                    y={0.644141}
                    width={43.25}
                    height={21.7122}
                    rx={6.6}
                    fillOpacity={0.01}
                    stroke="#fff"
                    strokeWidth={1.2}
                />
                <Path
                    d="M15.469 10.43l.37.656-1.125.418 1.124.41-.377.682-.936-.747.18 1.198h-.762l.164-1.198-.944.763-.393-.697 1.115-.419-1.107-.41.369-.665.96.739-.172-1.198h.77l-.18 1.198.944-.73zM21.422 10.43l.37.656-1.125.418 1.124.41-.377.682-.935-.747.18 1.198h-.763l.164-1.198-.943.763-.394-.697 1.116-.419-1.108-.41.37-.665.96.739-.173-1.198h.771l-.18 1.198.943-.73zM27.376 10.43l.369.656-1.124.418 1.124.41-.378.682-.935-.747.18 1.198h-.762l.164-1.198-.944.763-.394-.697 1.116-.419-1.108-.41.37-.665.96.739-.173-1.198h.772l-.18 1.198.943-.73zM33.329 10.43l.37.656-1.125.418 1.124.41-.377.682-.936-.747.18 1.198h-.762l.164-1.198-.944.763-.393-.697 1.115-.419-1.107-.41.369-.665.96.739-.172-1.198h.77l-.18 1.198.944-.73z"
                />
            </Svg>
        </View>
    );
});

export { UseAccessCodeIcon };
