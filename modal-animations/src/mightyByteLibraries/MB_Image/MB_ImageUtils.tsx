

export interface IMB_Image {
  _id: string,
  small?: string,
  medium?: string,
  large?: string,
}

export const MB_ImageUtils = {
  images: {
    someRandomImage: require('../../resources/images/subEksperienceBackgroundGaming.jpg'),
  },

  getMediumImage: <T extends { asUri?: boolean; preferLarge?: boolean } | undefined>(image: IMB_Image | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
    if (!image) {
      return undefined;
    }

    function processReturn(retVal: string) {
      return !options?.asUri ? retVal : { uri: retVal };
    }

    if (image.medium) {
      return processReturn(image.medium) as any;
    }

    if (options?.preferLarge) {
      if (image.large !== undefined) {
        return processReturn(image.large) as any;
      } else if (image.small !== undefined) {
        return processReturn(image.small) as any;
      }
    } else {
      if (image.small !== undefined) {
        return processReturn(image.small) as any;
      } else if (image.large !== undefined) {
        return processReturn(image.large) as any;
      }
    }

    return undefined;
  },

  getLargestImage: <T extends { asUri?: boolean } | undefined>(image: IMB_Image | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
    if (!image) {
      return undefined;
    }

    function processReturn(retVal: string) {
      return !options?.asUri ? retVal : { uri: retVal };
    }

    if (image.large !== undefined) {
      return processReturn(image.large) as any;
    } else if (image.medium !== undefined) {
      return processReturn(image.medium) as any;
    } else if (image.small !== undefined) {
      return processReturn(image.small) as any;
    }

    return undefined;
  },

  getSmallestImage: <T extends { asUri?: boolean } | undefined>(image: IMB_Image | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
    if (!image) {
      return undefined;
    }

    function processReturn(retVal: string) {
      return !options?.asUri ? retVal : { uri: retVal };
    }

    if (image.small !== undefined) {
      return processReturn(image.small) as any;
    } else if (image.medium !== undefined) {
      return processReturn(image.medium) as any;
    } else if (image.large !== undefined) {
      return processReturn(image.large) as any;
    }

    return undefined;
  },
};
