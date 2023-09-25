import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { MB_AnimatedSpinnierSquare } from '../../mightyByteLibraries/MB_AnimatedSpinnierSquare';



const LoadingPage = () => {
    const [isLoadingVisibleInternal, setIsLoadingVisibleInternal] = useState(false);

    useEffect(() => {
        const viewTimeout = setTimeout(() => { setIsLoadingVisibleInternal(true); }, 500);

        return () => {
            clearTimeout(viewTimeout);
        };
    }, []);

    if (!isLoadingVisibleInternal) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View>
                <MB_AnimatedSpinnierSquare containerStyle={{ alignSelf: 'center', marginBottom: 32 }} />

                <Text style={textStyles.largerText}>Loading...</Text>
            </View>
        </View>
    );
};

export { LoadingPage };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.englishViolet,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
