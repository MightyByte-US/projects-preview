import { MB_Button } from '@mightybyte/rnw.components.button';
import React, { useCallback, useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import { SampleModal } from '../modalPopUps/SampleModal';
import { MB_ModalAnimations } from '@mightybyte/rnw.components.modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';


interface ModalData {
  isVisible: boolean,
  animationIn?: MB_ModalAnimations,
  animationOut?: MB_ModalAnimations
}

const Home = () => {

  const [modalData, setModalData] = useState<ModalData>({ isVisible: false });
  const [duration, setDuration] = useState(300);

  const onDurationChange = useCallback((e: any) => {
    const newDuration = Number(e.nativeEvent.target.value);
    setDuration(newDuration);
  }, []);

  const showModal = useCallback((event: GestureResponderEvent) => {
    const animationIn = (event.nativeEvent.target as any).innerText;
    const animationOut = animationIn.toString().includes('In') ? animationIn.toString().replace('In', 'Out') : undefined;
    setModalData({
      isVisible: true,
      animationIn,
      animationOut,
    });
  }, []);

  const hideModal = useCallback(() => setModalData({ isVisible: false }), []);

  return (
    <SafeAreaProvider>
      <Text style={styles.title}>Modal Animations Examples</Text>
      <View style={styles.duration}>
        <Text>Duration </Text>
        <input type="number" value={duration} min={100} onInput={onDurationChange} />
        <Text> milliseconds</Text>
      </View>
      <View style={styles.container}>
        <SampleModal
          isVisible={modalData.isVisible}
          animationIn={modalData.animationIn}
          animationOut={modalData.animationOut}
          duration={duration}
          onDismiss={hideModal}
          textToShow={`This is an example of the animation ${modalData.animationIn?.toString().replace('In', '')}`}
        />
        <MB_Button onPress={showModal} style={styles.btn} title="bounce" />
        <MB_Button onPress={showModal} style={styles.btn} title="flash" />
        <MB_Button onPress={showModal} style={styles.btn} title="jello" />
        <MB_Button onPress={showModal} style={styles.btn} title="pulse" />
        <MB_Button onPress={showModal} style={styles.btn} title="rotate" />
        <MB_Button onPress={showModal} style={styles.btn} title="rubberBand" />
        <MB_Button onPress={showModal} style={styles.btn} title="shake" />
        <MB_Button onPress={showModal} style={styles.btn} title="swing" />
        <MB_Button onPress={showModal} style={styles.btn} title="tada" />
        <MB_Button onPress={showModal} style={styles.btn} title="wobble" />
        <MB_Button onPress={showModal} style={styles.btn} title="bounceIn" />
        <MB_Button onPress={showModal} style={styles.btn} title="bounceInDown" />
        <MB_Button onPress={showModal} style={styles.btn} title="bounceInUp" />
        <MB_Button onPress={showModal} style={styles.btn} title="bounceInLeft" />
        <MB_Button onPress={showModal} style={styles.btn} title="bounceInRight" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeIn" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInDown" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInDownBig" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInUp" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInUpBig" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInLeft" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInLeftBig" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInRight" />
        <MB_Button onPress={showModal} style={styles.btn} title="fadeInRightBig" />
        <MB_Button onPress={showModal} style={styles.btn} title="flipInX" />
        <MB_Button onPress={showModal} style={styles.btn} title="flipInY" />
        <MB_Button onPress={showModal} style={styles.btn} title="lightSpeedIn" />
        <MB_Button onPress={showModal} style={styles.btn} title="slideInDown" />
        <MB_Button onPress={showModal} style={styles.btn} title="slideInUp" />
        <MB_Button onPress={showModal} style={styles.btn} title="slideInLeft" />
        <MB_Button onPress={showModal} style={styles.btn} title="slideInRight" />
        <MB_Button onPress={showModal} style={styles.btn} title="zoomIn" />
        <MB_Button onPress={showModal} style={styles.btn} title="zoomInDown" />
        <MB_Button onPress={showModal} style={styles.btn} title="zoomInUp" />
        <MB_Button onPress={showModal} style={styles.btn} title="zoomInLeft" />
        <MB_Button onPress={showModal} style={styles.btn} title="zoomInRight" />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
        <View style={styles.btn} />
      </View>
    </SafeAreaProvider>
  );
};

export { Home };

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginHorizontal: 10,
    width: 200,
    marginTop: 10,
    backgroundColor: '#104E16',
  },
});
