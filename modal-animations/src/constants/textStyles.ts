import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

enum fontStyles {
    Poppins = 'Poppins',
}

const textStyles = StyleSheet.create({
    largerText: {
        fontFamily: fontStyles.Poppins,
        fontSize: 28,
        fontWeight: '600',
        lineHeight: 28,
        color: COLORS.white,
        textAlign: 'center',
    },
    largeText: {
        fontFamily: fontStyles.Poppins,
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 28,
        color: COLORS.white,
        textAlign: 'center',
    },
    normalText: {
        fontFamily: fontStyles.Poppins,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 28,
        color: COLORS.white,
        textAlign: 'center',
    },
    smallText: {
        fontFamily: fontStyles.Poppins,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 28,
        color: COLORS.white,
        textAlign: 'center',
    },
    smallerText: {
        fontFamily: fontStyles.Poppins,
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: COLORS.white,
        textAlign: 'center',
    },
    toolTipText: {
        fontFamily: fontStyles.Poppins,
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: COLORS.darkPurple,
        textAlign: 'center',
    },
});


export { textStyles, fontStyles };
