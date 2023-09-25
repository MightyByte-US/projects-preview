import { CustomHTMLCanvasElement } from './customCanvasForWeb';
import { CustomHTMLVideoElement } from './customVideoForWeb';


export enum WEB_POST_MESSAGE_OBJECT_TYPES {
    LOGIN_COMPLETE = 'LOGIN_COMPLETE',
    SOCIAL_MEDIA_CONNECT = 'SOCIAL_MEDIA_CONNECT',
    GENERAL_ERROR = 'GENERAL_ERROR',
    STRIPE_CONNECT = 'STRIPE_CONNECT',
}

export enum WEB_POST_MESSAGE_OBJECT_SUB_TYPES {
    INSTAGRAM_CONNECT = 'INSTAGRAM_CONNECT',
    TWITTER_CONNECT = 'TWITTER_CONNECT',
    TIKTOK_CONNECT = 'TIKTOK_CONNECT',
    STRIPE_CLOSED_OR_FINISHED = 'STRIPE_CLOSED_OR_FINISHED',
    STRIPE_NEEDS_REFRESH = 'STRIPE_NEEDS_REFRESH',
}


export interface IWebPostMessageObject {
    success: boolean,
    type: WEB_POST_MESSAGE_OBJECT_TYPES,
    subType?: WEB_POST_MESSAGE_OBJECT_SUB_TYPES,
    data?: any, // TODO: Put some type here
}

export interface IWebPostMessageEvent {
    origin: string,
    data: IWebPostMessageObject,
}

interface IFileReader {
    onabort: (evt: any) => void,
    onerror: (evt: any) => void,
    onload: (evt: any) => void,
    result: string | ArrayBuffer | null,
    loading: number,
    error: any,
    readAsArrayBuffer: (blob: Blob) => void,
    readAsBinaryString: (blob: Blob) => void,
}

type FileReaderClass = {
    new(...args: any[]): IFileReader,
};

export interface CustomHTMLImageElement {
    width: number;
    readonly naturalWidth: number;
    height: number;
    readonly naturalHeight: number;
}

interface HTMLElementTagNameMap {
    'canvas': CustomHTMLCanvasElement;
    'video': CustomHTMLVideoElement;
}

interface ElementCreationOptions {
    is?: string;
}

interface ICustomWindowForWeb {
    addEventListener: (type: string, callback: (event: IWebPostMessageEvent) => void) => void,
    removeEventListener: (type: string, callback: (event: IWebPostMessageEvent) => void) => void,
    opener: {
        postMessage: (message: IWebPostMessageObject, target: string) => void
    },
    open: (url: string, name: string, ...windowFeatures: string[]) => void,
    close: () => void,
    outerWidth: number,
    outerHeight: number,
    screenX: number,
    screenY: number,
    FileReader: FileReaderClass,
    getVideoDuration: (url: string) => Promise<number>,
    document: {
        /**
         * Creates an instance of the element for the specified tag.
         * @param tagName The name of an element.
         */
        createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
        createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
        fullscreenElement: Element;
        webkitFullscreenElement: Element;
        msFullscreenElement: Element;
    },
    readonly devicePixelRatio: number;
    getCurrentFullScreenElement: () => Element;
}

const customWindowForWeb: ICustomWindowForWeb = global as unknown as ICustomWindowForWeb;

customWindowForWeb.getCurrentFullScreenElement = () => {
    return (global as unknown as any).document.fullscreenElement;
};

customWindowForWeb.getVideoDuration = (url: string) => {
    return new Promise<number>((resolve, reject) => {
        const failureTimeout = setTimeout(() => reject('Timed out'), 5000);
        try {
            const video = customWindowForWeb.document.createElement('video');

            video.src = url;
            video.autoplay = false;
            video.onloadeddata = function () {
                clearTimeout(failureTimeout);
                resolve(video.duration);
            };
            video.addEventListener('error', (error) => {
                reject(error);
                clearTimeout(failureTimeout);
            });
        } catch (error) {
            clearTimeout(failureTimeout);
            reject(error);
        }
    });
};

export { customWindowForWeb };
