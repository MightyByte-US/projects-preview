import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { customWindowForWeb } from '../../utils/customWindowForWeb/customWindowForWeb';
import { IMB_VideoPlayer, IMB_VideoPlayerPlayStatus } from './MB_VideoPlayerUtils';
import { Image, Pressable, Text, View } from 'react-native';
import { textStyles } from '../../constants/textStyles';
import { applyTransparency, COLORS } from '../../constants/colors';
import screenfull from 'screenfull';
import { useIsFocused } from '@react-navigation/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
}: IMB_VideoPlayer) => {
    const [playing, setPlaying] = useState(false);
    const [showControlsInternal, setShowControlsInternal] = useState<boolean | undefined>();
    const videoPlayerRef = useRef<ReactPlayer>(null);

    const isFocused = useIsFocused();

    const stopVideo = useCallback(() => {
        if (playing) {
            setPlaying(false);
        }
        videoPlayerRef.current?.seekTo(0);
    }, [playing]);

    useImperativeHandle(MB_Ref, () => ({
        play: () => {
            if (!playing) {
                setPlaying(true);
            }
        },
        pause: () => {
            if (playing) {
                setPlaying(false);
            }
        },
        stop: () => {
            stopVideo();
        },
        presentFullscreenPlayer: () => {
            screenfull.request(videoPlayerRef.current?.getInternalPlayer());
        },
        isInvisibleVideo: () => {
            let isInvisible = false;
            if (!videoPlayerRef.current?.getInternalPlayer('hls')) {
                isInvisible = videoPlayerRef.current?.getInternalPlayer().videoHeight === 0 || videoPlayerRef.current?.getInternalPlayer().videoWidth === 0;
            }

            return isInvisible;
        },
    }));

    // Note: Need this because video player flashes the native controls initially if it was directly set to true.
    useEffect(() => {
        let nativeControlsSetTimeout = setTimeout(() => setShowControlsInternal(showControls), 1000);

        return () => {
            clearTimeout(nativeControlsSetTimeout);
        };
    }, [showControls]);

    const isNativeControlsEnabledByTempFixed = (isHovered: boolean) => {
        if (isHovered && showControls && showControlsInternal === undefined) {
            return true;
        }

        return false;
    };

    const LightThumbnailComponent = useCallback(() => {
        return (
            <View style={previewContainerStyle}>
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
                        width: 52.5,
                        height: 52.5,
                        paddingStart: 2,
                        borderRadius: 300,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: applyTransparency(COLORS.black, 0.4),
                        borderWidth: 1,
                        borderColor: applyTransparency(COLORS.white, 0.15),
                    }}>
                        <FontAwesome name="play" size={21} color={COLORS.white} />
                    </View>
                </View>
            </View>
        );
    }, [previewContainerStyle, previewImageUrl]);

    if (failed) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, containerStyle]}>
                <MaterialCommunityIcons name="image-broken" color={COLORS.white} size={64} />
                <Text style={[textStyles.normalText, { marginTop: 16 }]}>{failedMessage}</Text>
            </View>
        );
    }

    // For cases where we navigate to other page while the page that is playing
    // the video stays mounted. We will basically detect that view is not in focus
    // and will unmount the video
    if (!isFocused) {
        return null;
    }

    return (
        <Pressable style={containerStyle}>
            {({ hovered }: { hovered: boolean }) => {
                return (
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        ref={videoPlayerRef}
                        url={sourceUrl}
                        playing={playing}
                        onStart={() => {
                            setPlaying(true);
                            onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.started);
                        }}
                        onPlay={() => {
                            setPlaying(true);
                            onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.playing);
                        }}
                        onPause={() => {
                            setPlaying(false);
                            onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.paused);
                        }}
                        onEnded={() => {
                            setPlaying(false);
                            onPlayStatusChanged?.(IMB_VideoPlayerPlayStatus.ended);
                        }}
                        onError={(error, data, hlsInstance, hlsGlobal) => {
                            console.log('Video player error', { error, data, hlsInstance, hlsGlobal });
                            onError?.(error);
                        }}
                        light={showPreview}

                        playIcon={<LightThumbnailComponent />}
                        onClickPreview={onPreviewPressed}
                        onReady={() => {
                            onReady?.();
                            if (shouldPlay && shouldPlay !== playing) {
                                setPlaying(shouldPlay);
                            }

                            videoPlayerRef.current?.getInternalPlayer().addEventListener('fullscreenchange', (event: any) => {
                                const isFullScreen = customWindowForWeb.document.fullscreenElement === event.target || customWindowForWeb.document.webkitFullscreenElement === event.target;
                                onFullscreenUpdate?.(isFullScreen);
                            });
                            videoPlayerRef.current?.getInternalPlayer()?.addEventListener('webkitfullscreenchange', (event: any) => {
                                const isFullScreen = customWindowForWeb.document.fullscreenElement === event.target || customWindowForWeb.document.webkitFullscreenElement === event.target;
                                onFullscreenUpdate?.(isFullScreen);
                            });
                            videoPlayerRef.current?.getInternalPlayer()?.addEventListener('webkitbeginfullscreen', () => {
                                const isFullScreen = true;
                                onFullscreenUpdate?.(isFullScreen);
                            });
                            videoPlayerRef.current?.getInternalPlayer()?.addEventListener('webkitendfullscreen', () => {
                                const isFullScreen = false;
                                onFullscreenUpdate?.(isFullScreen);
                            });
                            videoPlayerRef.current?.getInternalPlayer()?.addEventListener('MSFullscreenChange', (event: any) => {
                                const isFullScreen = customWindowForWeb.document.fullscreenElement === event.target || customWindowForWeb.document.webkitFullscreenElement === event.target ||
                                    customWindowForWeb.document.msFullscreenElement === event.target;
                                onFullscreenUpdate?.(isFullScreen);
                            });
                        }}
                        controls={showControlsInternal ?? isNativeControlsEnabledByTempFixed(hovered)}
                        loop={isLooping}
                        muted={isMuted}
                    />
                );
            }}
        </Pressable>
    );
});

export { MB_VideoPlayer };
