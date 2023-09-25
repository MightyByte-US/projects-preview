import React from 'react';
import { StyleSheet } from 'react-native';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';
import { HomeProps } from '../../typesInterfacesEnums/componentProps';
import { ComponentWrapper } from '../helperComponents/ComponentWrapper';


const Home = ({ navigation }: HomeProps) => {

  const onComponentsGalleryPressed = () => {
    navigation.navigate('ComponentsDemo');
  };

  return (
    <ComponentWrapper containerStyle={{ minWidth: 1000}} innerContainerStyle={{ paddingHorizontal: 54, height: '70%'  }}>

      <MB_Button
        title="View Components Demo page"
        onPress={onComponentsGalleryPressed}
        style={styles.button}
      />
    </ComponentWrapper>
  );
};

export { Home };

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
