import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { applyTransparency, COLORS } from '../../constants/colors';
import { textStyles } from '../../constants/textStyles';
import { IMB_VideoPlayer, IMB_VideoPlayerPlayStatus } from './MB_VideoPlayerUtils';
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from 'expo-av';

const MB_VideoPlayer = React.memo(({
    MB_Ref,
    sourceUrl,
    showControls,
    isLooping,
    isMuted,
    shouldPlay,
    onFullscreenUpdate,
    onError,
    failed,
    failedMessage,
    containerStyle,
    showPreview,
    previewImageUrl,
    previewContainerStyle,
    onPreviewPressed,
    onReady,
    onPlayStatusChanged,
    resizeMode,
}: IMB_VideoPlayer) => {
    const [shouldPlayInternal, setShouldPlayInternal] = useState<boolean | undefined>();
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
    const videoPlayerRef = useRef<Video>(null);
    const [status, setStatus] = React.useState<AVPlaybackStatus | undefined>();
    const isFocused = useIsFocused();
    const [showingPreview, setShowingPreview] = useState<boolean | undefined>(undefined);
    const [onStartSent, setOnStartSent] = useState(false);

    // Responsible for sending onPlayStatusChanged events
    React.useEffect(() => {
        if (status?.isLoaded) {
            if (status.isPlaying !== isCurrentlyPlaying) {
                setIsCurrentlyPlaying(status.isPlaying);
                if (!isLooping && status.didJustFinish) {
                    onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.ended);
                } else {
                    onPlayStatusChanged?.(status.isPlaying ? IMB_VideoPlayerPlayStatus.playing : IMB_VideoPlayerPlayStatus.paused);
                }
            }

            if (status.isPlaying && !onStartSent) {
                setOnStartSent(true);
                onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.started);
            }
        }
    }, [isCurrentlyPlaying, isLooping, onPlayStatusChanged, onStartSent, status]);

    React.useEffect(() => {
        if (showingPreview === undefined && showPreview) {
            setShowingPreview(true);
        }
    }, [showPreview, showingPreview]);

    React.useEffect(() => {
        if (shouldPlayInternal === undefined) {
            setShouldPlayInternal(shouldPlay);
        }
    }, [shouldPlay, shouldPlayInternal]);


    const onFullScreenUpdateCallback = useCallback((event: VideoFullscreenUpdateEvent) => {
        if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT || event.fullscreenUpdate === Video.IOS_FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
            onFullscreenUpdate?.(true);
        } else if (event.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS || event.fullscreenUpdate === Video.IOS_FULLSCREEN_UPDATE_PLAYER_DID_DISMISS) {
            onFullscreenUpdate?.(false);
        }
    }, [onFullscreenUpdate]);


    useImperativeHandle(MB_Ref, () => ({
        play: () => {
            if (status?.isLoaded && !status.isPlaying) {
                videoPlayerRef.current?.playAsync();
            }
        },
        pause: () => {
            if (status?.isLoaded && !status.isPlaying) {
                videoPlayerRef.current?.pauseAsync();
            }
        },
        stop: () => {
            videoPlayerRef.current?.stopAsync();
        },
        presentFullscreenPlayer: () => {
            videoPlayerRef.current?.presentFullscreenPlayer();
        },
        isInvisibleVideo: () => {
            // Needed for web but not needed here so just return false
            return false;
        },
    }));

    const PreviewComponent = useCallback(() => {
        return (
            <TouchableOpacity
                style={[styles.videoPlayer, previewContainerStyle]}
                onPress={() => {
                    if (onPreviewPressed) {
                        onPreviewPressed();
                        return;
                    }

                    setShowingPreview(false);
                    setShouldPlayInternal(true);
                }}
            >
                {previewImageUrl ?
                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: previewImageUrl }} />
                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <MaterialCommunityIcons name="image-broken" color={COLORS.white} size={32} />
                        <Text style={[textStyles.smallerText, { marginTop: 4 }]}>Thumbnail not available</Text>
                    </View>
                }

                <View style={{
                    width: '100%',
                    height: '100%',
                    alignItems: previewImageUrl ? 'center' : 'flex-start',
                    justifyContent: previewImageUrl ? 'center' : 'flex-start',
                    paddingTop: previewImageUrl ? 0 : 8,
                    paddingStart: previewImageUrl ? 0 : 8,
                    position: 'absolute',
                }}
                >
                    <View style={{
                        width: 26,
                        height: 26,
                        paddingStart: 2,
                        borderRadius: 300,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: applyTransparency(COLORS.black, 0.4),
                        borderWidth: 1,
                        borderColor: applyTransparency(COLORS.white, 0.15),
                    }}>
                        <FontAwesome name="play" size={12} color={COLORS.white} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [onPreviewPressed, previewContainerStyle, previewImageUrl]);

    // TODO: Do we need this ?
    // For cases where we navigate to other page while the page that is playing
    // the video stays mounted. We will basically detect that view is not in focus
    // and will unmount the video
    if (!isFocused) {
        return null;
    }

    if (failed) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, containerStyle]}>
                <MaterialCommunityIcons name="image-broken" color={COLORS.white} size={64} />
                <Text style={[textStyles.normalText, { marginTop: 16 }]}>{failedMessage}</Text>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            {showingPreview ?
                <PreviewComponent />
                :
                <Video
                    ref={videoPlayerRef}
                    source={!sourceUrl ? undefined : typeof sourceUrl === 'number' ? sourceUrl : { uri: sourceUrl }}
                    style={styles.videoPlayer}
                    shouldPlay={shouldPlayInternal}
                    onFullscreenUpdate={onFullScreenUpdateCallback}
                    useNativeControls={showControls}
                    isLooping={isLooping}
                    isMuted={isMuted}
                    onPlaybackStatusUpdate={setStatus}
                    onReadyForDisplay={() => {
                        onReady?.();
                    }}
                    onError={(error) => {
                        console.log('Video player error', error);
                        onError?.(error);
                    }}
                    resizeMode={resizeMode === 'none' ? undefined : resizeMode}
                // TODO: Probably allow it to be horizontal when full screen mode
                />
            }
        </View>
    );
});

export { MB_VideoPlayer };

const styles = StyleSheet.create({
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
});
