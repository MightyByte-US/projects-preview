import { RefObject } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface IMB_VideoPlayerRef {
    play: () => void,
    pause: () => void,
    stop: () => void,
    presentFullscreenPlayer: () => void,
    // For some types of videos, only the audio is being loaded so we try to detect it here.
    // If returns true, we can assume that there is only audio present.
    isInvisibleVideo: () => boolean,
}

export enum IMB_VideoPlayerPlayStatus {
    playing = 'playing',
    paused = 'paused',
    ended = 'ended',
    started = 'started',
}

export interface IMB_VideoPlayer {
    MB_Ref?: RefObject<IMB_VideoPlayerRef>
    sourceUrl: string | undefined
    showControls?: boolean
    isLooping?: boolean
    isMuted?: boolean
    shouldPlay?: boolean
    onFullscreenUpdate?: ((isFullScreen: boolean) => void) | undefined
    onError?: ((error: any) => void) | undefined
    failed?: boolean
    failedMessage?: string
    containerStyle?: StyleProp<ViewStyle>
    showPreview?: boolean,
    previewImageUrl?: string,
    previewContainerStyle?: StyleProp<ViewStyle>
    onPreviewPressed?: () => void
    onReady?: () => void
    onPlayStatusChanged?: (status: IMB_VideoPlayerPlayStatus) => void
    resizeMode?: 'stretch' | 'contain' | 'cover' | 'none' | undefined; // via Image#resizeMode
}
