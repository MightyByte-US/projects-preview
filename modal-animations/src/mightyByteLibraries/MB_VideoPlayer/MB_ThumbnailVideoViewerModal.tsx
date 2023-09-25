import React, { RefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleProp, ViewStyle, StyleSheet, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { textStyles } from '../../constants/textStyles';
import { IMB_VideoPlayerPlayStatus, IMB_VideoPlayerRef } from './MB_VideoPlayerUtils';
import { MB_VideoPlayer } from './MB_VideoPlayer';
import { applyTransparency, COLORS } from '../../constants/colors';
import { utils } from '../../utils/utils';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MB_Modal } from '../MB_Modal/MB_Modal';
import { IImage, IMB_PressableStateCallbackType, IVideo } from '../../typesInterfacesEnums/typesAndInterfaces';
import { MB_Image } from '../MB_Image/MB_Image';

export interface IMB_ThumbnailVideoViewerModalRef {
    isShowingModal: () => boolean,
    isPlayerInFullScreen: () => boolean,
    setModalVisibility: (isVisible: boolean) => void,
}

interface IMB_ThumbnailVideoViewerModal {
    thumbnailContainerStyle?: StyleProp<ViewStyle>
    playerContainerStyle?: StyleProp<ViewStyle>
    video: IVideo | undefined
    thumbnailSizeToUse?: 'small' | 'medium' | 'large'
    customThumbnail?: IImage,
    onShowHideModalUpdate?: (isShowing: boolean) => void
    onShowHideFullScreenPlayerUpdate?: (isFullScreen: boolean) => void
    onThumbnailPressed?: () => void
    MB_ThumbnailVideoViewerModalRef?: RefObject<IMB_ThumbnailVideoViewerModalRef>
    disableModalVideo?: boolean // Useful in places where we want to implement the thumbnail and the listener but actually don`t show any videos.
    customVideoProcessingView?: React.ReactNode
    customNoThumbnailView?: React.ReactNode
    thumbnailPlayIconStyle?: StyleProp<ViewStyle>
    thumbnailPlayIconArrowSize?: number
    hidePlayIcon?: boolean
    grayscaleFilter?: number
    closeOnBackdropPress?: boolean
    onPlayStatusChanged?: (status: IMB_VideoPlayerPlayStatus) => void
    animationTiming?: number
}


/**
 * This component is a helper component for IMB_VideoPlayer that will just show the thumbnail without loading the video player.
 * Once the user presses on the thumbnail, then the video player will load and show up in full screen mode (Atuo Full Screen Does not work on safari for now)
 * Once the user exits the full screen (Or pauses on safari while not in full screen) then the video player itself will be unloaded.
 */
const MB_ThumbnailVideoViewerModal = React.memo(({
    thumbnailContainerStyle,
    playerContainerStyle,
    video,
    thumbnailSizeToUse,
    customThumbnail,
    onShowHideModalUpdate,
    onShowHideFullScreenPlayerUpdate,
    onThumbnailPressed,
    MB_ThumbnailVideoViewerModalRef,
    disableModalVideo,
    customVideoProcessingView,
    customNoThumbnailView,
    thumbnailPlayIconStyle,
    thumbnailPlayIconArrowSize,
    hidePlayIcon,
    grayscaleFilter,
    closeOnBackdropPress,
    onPlayStatusChanged,
    animationTiming,
}: IMB_ThumbnailVideoViewerModal) => {
    const internalVideoPlayerRef = useRef<IMB_VideoPlayerRef>(null);
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useImperativeHandle(MB_ThumbnailVideoViewerModalRef, () => ({
        isShowingModal: () => isShowingModal,
        isPlayerInFullScreen: () => isFullScreen,
        setModalVisibility: (isVisible: boolean) => {
            setIsShowingModal(isVisible);
        },
    }));

    const onFullscreenUpdate = (fullScreenStatus: boolean) => {
        setIsFullScreen(fullScreenStatus);
        onShowHideFullScreenPlayerUpdate?.(fullScreenStatus);
    };

    useEffect(() => {
        onShowHideModalUpdate?.(isShowingModal);
    }, [isShowingModal, onShowHideModalUpdate]);

    const onThumbnailPressedInternal = React.useCallback(() => {
        onThumbnailPressed?.();
        if (!disableModalVideo) {
            setIsShowingModal(true);
        }
    }, [disableModalVideo, onThumbnailPressed]);

    const Thumbnail = useCallback(() => {

        if (!video) {
            return null;
        }

        let thumbnail: { uri: string } | undefined;
        if (thumbnailSizeToUse === 'small') {
            thumbnail = utils.getSmallestImage(customThumbnail ?? video.thumbnail, { asUri: true });
        } else if (thumbnailSizeToUse === 'medium') {
            thumbnail = utils.getMediumImage(customThumbnail ?? video.thumbnail, { asUri: true });
        } else {
            thumbnail = utils.getSmallestImage(customThumbnail ?? video.thumbnail, { asUri: true });
        }

        const blurViewAbsolutePositionStyle: StyleProp<ViewStyle> = thumbnail ? {} : { left: 8, top: 8, borderColor: COLORS.white };

        return (
            <Pressable style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={onThumbnailPressedInternal}>
                {({ hovered }: IMB_PressableStateCallbackType) => {
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            {thumbnail ?
                                <MB_Image grayscaleFilter={grayscaleFilter} source={thumbnail} style={{ width: '100%', height: '100%' }} disableInteraction activateHover={hovered} />
                                :
                                <View>
                                    {customNoThumbnailView ?
                                        <View>
                                            {customNoThumbnailView}
                                        </View>
                                        :
                                        <View style={{ alignItems: 'center' }}>
                                            <MaterialCommunityIcons name="image-broken" color={COLORS.white} size={64} />
                                            <Text style={[textStyles.smallText, { textAlign: 'center' }]}>Thumbnail not available</Text>
                                        </View>
                                    }
                                </View>
                            }
                            {!hidePlayIcon &&
                                <BlurView
                                    intensity={60}
                                    tint={'dark'}
                                    style={[styles.playIconBlurBackground, blurViewAbsolutePositionStyle, thumbnailPlayIconStyle]}
                                >
                                    <FontAwesome name="play" size={thumbnailPlayIconArrowSize ?? 13} color={COLORS.white} />
                                </BlurView>
                            }
                        </View>
                    );
                }}
            </Pressable>
        );
    }, [customNoThumbnailView, customThumbnail, grayscaleFilter, hidePlayIcon, onThumbnailPressedInternal, thumbnailPlayIconArrowSize, thumbnailPlayIconStyle, thumbnailSizeToUse, video]);

    if (!video) {
        return null;
    }

    if (video.isProcessing) {
        return (
            <View style={[styles.thumbnailContainerStyle, thumbnailContainerStyle]}>
                {
                    customVideoProcessingView
                    ??
                    <>
                        <View style={styles.playIconContainer}>
                            <FontAwesome name="play" size={24} color={COLORS.plum} />
                        </View>
                        <Text style={[textStyles.smallText, { lineHeight: 21, marginTop: 8 }]}>We're processing this video.{'\n'}Please check back later.</Text>
                    </>
                }
            </View>
        );
    }

    return (
        <View style={[styles.thumbnailContainerStyle, thumbnailContainerStyle]}>
            <MB_Modal
                isVisible={isShowingModal}
                onDismiss={setIsShowingModal}
                childrenWrapperStyle={{ paddingHorizontal: 96, paddingVertical: 96 }}
                closeOnBackdropPress={closeOnBackdropPress}
                animationInTiming={animationTiming}
                animationOutTiming={animationTiming}
            >
                <MB_VideoPlayer
                    sourceUrl={video.url}
                    containerStyle={[{ width: '100%', height: '100%', backgroundColor: COLORS.black }, playerContainerStyle]}
                    MB_Ref={internalVideoPlayerRef}
                    onFullscreenUpdate={onFullscreenUpdate}
                    showControls={true}
                    onReady={() => {
                        internalVideoPlayerRef.current?.play();
                    }}
                    onPlayStatusChanged={onPlayStatusChanged}
                />
            </MB_Modal>

            <Thumbnail />
        </View>
    );
});


export { MB_ThumbnailVideoViewerModal };

const styles = StyleSheet.create({
    thumbnailContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.plum,
        overflow: 'hidden',
    },
    playIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        paddingStart: 4,
        backgroundColor: COLORS.lightGray,
        borderRadius: 300,
    },
    playIconBlurBackground: {
        width: 33,
        height: 33,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300,
        borderWidth: 1,
        borderColor: applyTransparency(COLORS.white, 0.15),
        paddingStart: 2,
    },
});
