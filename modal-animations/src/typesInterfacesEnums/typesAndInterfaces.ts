
export interface IMB_PressableStateCallbackType {
  hovered?: boolean // Exist only on web
  focused?: boolean // Exist only on web
  pressed: boolean
}

export interface IImage {
  _id: string,
  small?: string,
  medium?: string,
  large?: string,
}

export type IVideo = {
  _id?: string,
  thumbnail?: IImage,
  url: string,
  isProcessing: boolean,
}
