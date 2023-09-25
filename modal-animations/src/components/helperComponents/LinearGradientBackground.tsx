import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/colors';



export const LinearGradientBackground = React.memo(() => {
    return (
        <LinearGradient
            colors={[COLORS.darkPurpleLight, COLORS.englishViolet]}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            locations={[0.64, 1]}
            style={styles.linearGradientStyle}
        />
    );
});

const styles = StyleSheet.create({
    linearGradientStyle: {
        width: '100%',
        height: 530,
        position: 'absolute',
    },
});

