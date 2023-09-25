import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';


type TMB_Pressable = PressableProps & React.RefAttributes<View> & {
    onHoverIn?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void,
    onHoverOut?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void,
    onContextMenu?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void,
}

const MB_Pressable = (props: TMB_Pressable) => {
    return (
        <Pressable {...props} />
    );
};

export { MB_Pressable };
