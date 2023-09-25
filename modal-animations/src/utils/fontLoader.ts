import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import WebFont from 'webfontloader';


export const useFontLoader = () => {
  const [webFontLoaded, setWebFontLoaded] = useState(false);
  const [allFontsLoaded, setAllFontsLoaded] = useState(false);
  if (Platform.OS === 'web') {
    WebFont.load({
      google: {
        families: ['Poppins'],
      },
      active: () => setWebFontLoaded(true),
    });
  }

  const [defaultVectorIconFontsLoaded, error] = useFonts({
    AntDesign: require('../../node_modules/react-native-vector-icons/Fonts/AntDesign.ttf'),
    Feather: require('../../node_modules/react-native-vector-icons/Fonts/Feather.ttf'),
    FontAwesome: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
    MaterialCommunityIcons: require('../../node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    Entypo: require('../../node_modules/react-native-vector-icons/Fonts/Entypo.ttf'),
  });

  useEffect(() => {
    if (webFontLoaded && defaultVectorIconFontsLoaded && !allFontsLoaded) {
      setAllFontsLoaded(true);
    }
  }, [allFontsLoaded, defaultVectorIconFontsLoaded, webFontLoaded]);

  return [allFontsLoaded, error];
};
