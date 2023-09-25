type HTMLOrSVGImageElement = HTMLImageElement | SVGImageElement;
type CanvasImageSource = HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap;

interface CustomCanvasRenderingContext2DSettings {
    alpha?: boolean;
    colorSpace?: 'display-p3' | 'srgb';
    desynchronized?: boolean;
    willReadFrequently?: boolean;
}

interface CustomCanvasRenderingContext2DSettings {
    alpha?: boolean;
    colorSpace?: 'display-p3' | 'srgb';
    desynchronized?: boolean;
    willReadFrequently?: boolean;
}

interface ImageBitmap {
    readonly height: number;
    readonly width: number;
    close(): void;
}

interface CustomCanvasRenderingContext2D {
    readonly canvas: HTMLCanvasElement;
    getContextAttributes(): CustomCanvasRenderingContext2DSettings;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: 'high' | 'low' | 'medium';
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
}

export interface CustomHTMLCanvasElement {
    height: number;
    width: number;
    getContext(contextId: '2d', options?: CustomCanvasRenderingContext2DSettings): CustomCanvasRenderingContext2D | null;
    toBlob(callback: (blob: Blob | null) => void, type?: string, quality?: any): void;
}
