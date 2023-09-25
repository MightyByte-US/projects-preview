import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { MB_AnimatedSpinnierSquare } from '../../mightyByteLibraries/MB_AnimatedSpinnierSquare';
import { MB_Button } from '../../mightyByteLibraries/MB_Button';
import { MB_DialogueShow } from '../../mightyByteLibraries/MB_Dialogue/MB_Dialogue';
import { MB_Image } from '../../mightyByteLibraries/MB_Image/MB_Image';
import { IMB_Image, MB_ImageUtils } from '../../mightyByteLibraries/MB_Image/MB_ImageUtils';
import MB_OnHoverWrapper from '../../mightyByteLibraries/MB_OnHoverWrapper/MB_OnHoverWrapper';
import { MB_ToolTipHover } from '../../mightyByteLibraries/MB_ToolTips/MB_ToolTipHover';
import { MB_ThumbnailVideoViewerModal } from '../../mightyByteLibraries/MB_VideoPlayer/MB_ThumbnailVideoViewerModal';
import { MB_VideoPlayer } from '../../mightyByteLibraries/MB_VideoPlayer/MB_VideoPlayer';
import { IVideo } from '../../typesInterfacesEnums/typesAndInterfaces';
import { ComponentWrapper } from '../helperComponents/ComponentWrapper';
import { SampleModal } from '../modalPopUps/SampleModal';

const imageFromWeb: IMB_Image = {
    _id: 'someId',
    large: 'https://i.natgeofe.com/k/88de42b8-764c-40d2-89ee-e72d55dc95b8/emperor-penguin-chicks_4x3.jpg',
};

const someRandomVideo: IVideo = {
    thumbnail: imageFromWeb,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isProcessing: false,
};

const Part1 = () => {

    const [isSampleModalVisible, setIsSampleModalVisible] = useState(false);
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.titlesText}>Buttons</Text>
            <MB_Button
                title="Regular button"
                style={styles.regularButton}
            />

            <MB_Button
                title="Border Button"
                style={[styles.regularButton, { backgroundColor: 'transparent', borderWidth: 2 }]}
            />

            <MB_Button
                title="Button with inner components"
                style={styles.regularButton}
                rightIcon={<Text style={[textStyles.smallText, { backgroundColor: '#00ff00', height: 32, lineHeight: 14 }]}>{'I am a\nComponent'}</Text>}
                icon={<Feather name="archive" size={32} />}
            />

            <Text style={styles.titlesText}>Modal</Text>

            <SampleModal isVisible={isSampleModalVisible} onDismiss={() => setIsSampleModalVisible(false)} textToShow="Hello Sample Modal" />
            <MB_Button
                title="Show Sample Modal"
                style={styles.regularButton}
                onPress={() => setIsSampleModalVisible(true)}
            />

            <Text style={styles.titlesText}>Spinner</Text>
            <MB_AnimatedSpinnierSquare containerStyle={{ marginTop: 16 }} />

            <Text style={styles.titlesText}>Video Player</Text>
            <MB_VideoPlayer
                containerStyle={{
                    height: 300,
                    aspectRatio: 622 / 810,
                    alignItems: 'flex-start',
                }}
                sourceUrl={require('../../resources/videos/signInVideo.mp4')}
                showControls={true}
                isLooping
                isMuted
                shouldPlay
            />


            <Text style={styles.titlesText}>Thumbnail Video Player</Text>
            <MB_ThumbnailVideoViewerModal
                thumbnailContainerStyle={styles.thumbnail}
                video={someRandomVideo}
            />
        </View>
    );
};

const Part2 = () => {

    return (
        <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.titlesText}>Global customizable Dialogue{'\n'}Still needs styling</Text>
            <MB_Button
                title="Show Sample Modal"
                style={styles.regularButton}
                onPress={() => MB_DialogueShow({ title: 'Our Modal PopUp', message: 'We can customize a lot of things here but we still need styling' })}
            />

            <Text style={styles.titlesText}>Hoverable ToolTips(hover over "i" below)</Text>
            <MB_ToolTipHover
                disableShadow
                toolTipElement={
                    <View style={{ width: 196, marginHorizontal: 8 }} >
                        <Text style={textStyles.toolTipText}>Connect your Stripe Standard account to take payments through Stripe.</Text>
                    </View>
                }
                backgroundColor={'transparent'}
                wrapperStyle={{ alignSelf: 'center', marginStart: 8 }}
            >
                <AntDesign name="infocirlceo" color="#ADAEB5" size={64} style={{ alignSelf: 'flex-start' }} />
            </MB_ToolTipHover>

            <Text style={styles.titlesText}>On Hover Wrapper</Text>
            <MB_OnHoverWrapper
                wrapperStyle={{
                    width: 300,
                    height: 50,
                    marginTop: 16,
                    backgroundColor: COLORS.plum,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                }}
                onHoverWrapperStyleModifier={{
                    backgroundColor: COLORS.AllportsBlue,
                }}
            >
                <Text style={[textStyles.normalText, { textAlign: 'left' }]}>Hover Over Me!</Text>
            </MB_OnHoverWrapper>

            <Text style={styles.titlesText}>Image component with hover animations(can be disabled){'\n'} Will support mobile version with caching</Text>
            <MB_Image
                source={MB_ImageUtils.getSmallestImage(imageFromWeb, { asUri: true }) ?? MB_ImageUtils.images.someRandomImage}
                style={{ width: 400, aspectRatio: 1.333, marginTop: 16 }}
            />

            <Text style={styles.titlesText}>Local Img + disabled interactions</Text>
            <MB_Image
                source={MB_ImageUtils.images.someRandomImage}
                disableInteraction
                style={{ width: 400, aspectRatio: 1.333, marginTop: 16 }}
            />

        </View>
    );
};

const ComponentsDemo = () => {
    return (
        <ComponentWrapper containerStyle={{ minWidth: 1000 }} innerContainerStyle={{ paddingHorizontal: 54, height: '70%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Part1 />
                <Part2 />
            </View>
        </ComponentWrapper>
    );
};

export { ComponentsDemo };

const styles = StyleSheet.create({
    button: {
        marginTop: 50,
        alignItems: 'flex-start',
    },
    titlesText: StyleSheet.flatten([
        textStyles.largeText, {
            marginTop: 32,
            textAlign: 'left',
        },
    ]),
    regularButton: {
        height: 54,
        marginTop: 16,
        backgroundColor: COLORS.plum,
    },
    thumbnail: {
        width: 214,
        height: 156,
        borderRadius: 10,
    },
});
