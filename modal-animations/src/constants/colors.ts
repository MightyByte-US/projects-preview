
export const applyTransparency = (color: COLORS | string, transparencyFloat: number) => {
    if (transparencyFloat < 0 || transparencyFloat > 1) {
        return color;
    }

    let transparencyHex = Math.floor(transparencyFloat * 255).toString(16);
    if (transparencyHex.length === 1) {
        transparencyHex = '0' + transparencyHex;
    }

    return color + transparencyHex;
};

export enum COLORS {
    offRed = '#FF3B3B',
    black = '#000000',
    white = '#ffffff',
    AllportsBlue = '#03769e',
    englishViolet = '#4D2D52',
    plum = '#9A4C95',
    lighterGray = '#BAC0CA',
    darkPurple = '#1D1A31',
    lightGray = '#E3E3E3',
    dimViolet = '#B8ABBA',
    darkPurpleLight = '#2B203B',
}
