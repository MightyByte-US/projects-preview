import { IImage } from '../typesInterfacesEnums/typesAndInterfaces';

export const utils = {
    getMediumImage: <T extends { asUri?: boolean; preferLarge?: boolean } | undefined>(image: IImage | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
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

    getLargestImage: <T extends { asUri?: boolean } | undefined>(image: IImage | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
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

    getSmallestImage: <T extends { asUri?: boolean } | undefined>(image: IImage | undefined, options?: T): (T extends { asUri: true } ? { uri: string } : string) | undefined => {
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
