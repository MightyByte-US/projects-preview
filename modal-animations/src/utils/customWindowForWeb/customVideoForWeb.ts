export interface CustomHTMLVideoElement {
    src: string;
    autoplay?: boolean;
    onloadeddata: ((this: any, ev: Event) => any) | null;
    duration: number;
    addEventListener: (type: string, listener: (error: any) => any) => void
}
