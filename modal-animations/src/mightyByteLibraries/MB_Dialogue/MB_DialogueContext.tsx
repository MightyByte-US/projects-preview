import React, { useState } from 'react';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IShowPopUp {
    title?: string;
    titleStyle?: StyleProp<TextStyle>
    message?: string;
    messageStyle?: StyleProp<TextStyle>
    topComponent?: React.ReactNode;
    middleComponent?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    buttonText?: string;
    buttonAction?: any;
    secondaryButtonText?: string;
    secordaryButtonAction?: any;
}

interface IPopUpState {
    isVisible: boolean,
    title?: string,
    titleStyle?: StyleProp<TextStyle>,
    message?: string,
    messageStyle?: StyleProp<TextStyle>
    topComponent?: React.ReactNode,
    middleComponent?: React.ReactNode,
    buttonText?: string,
    buttonAction?: (() => void),
    secondaryButtonText?: string,
    secondaryButtonAction?: (() => void),
}

interface IMB_DialogueContextProvider {
    showPopUp: (props: IShowPopUp) => void,
    hidePopUp: () => void,
    state: IPopUpState,
}

const MB_DialogueContext = React.createContext<IMB_DialogueContextProvider>({
    showPopUp: () => { },
    hidePopUp: () => { },
    state: {
        isVisible: false,
    },
});

const MB_DialogueContextProvider = ({ children }: { children: ReactNode }) => {
    const [popUpState, setPopUpState] = useState<IPopUpState>({ isVisible: false });

    const showPopUp = (props: IShowPopUp) => {
        setPopUpState({
            isVisible: true,
            title: props.title,
            titleStyle: props.titleStyle,
            message: props.message,
            messageStyle: props.messageStyle,
            topComponent: props.topComponent,
            middleComponent: props.middleComponent,
            buttonText: props.buttonText,
            buttonAction: props.buttonAction,
            secondaryButtonText: props.secondaryButtonText,
            secondaryButtonAction: props.secordaryButtonAction,
        });
    };

    const hidePopUp = () => {
        setPopUpState(old => ({ ...old, isVisible: false }));
    };

    const value = {
        showPopUp,
        hidePopUp,
        state: popUpState,
    };

    return (
        <MB_DialogueContext.Provider value={value}>
            {children}
        </MB_DialogueContext.Provider>
    );
};

export { MB_DialogueContext, MB_DialogueContextProvider };
