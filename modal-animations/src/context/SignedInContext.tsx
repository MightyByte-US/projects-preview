
import React, { useState } from 'react';
import { USER_TYPES } from '../typesInterfacesEnums/enums';


export const signedInContextGlobalFunction: { signOut?: (params: ISignOut) => void } = {};

export interface ISignOut { skipSignOutRequest?: boolean; showExpiredError?: boolean; makeRefreshTokenCall?: boolean }

export const enum SIGNED_IN_STATUS {
    loading = 'loading',
    signedIn = 'signedIn',
    signedOut = 'signedOut',
}

export interface ISignedInContextType {
    isSignedIn: boolean,
    userType: USER_TYPES,
    signedInStatus: SIGNED_IN_STATUS,
    setSignedInStatus: ({ isSignedIn, userType }: { isSignedIn: SIGNED_IN_STATUS, userType: USER_TYPES }) => void,
    signOut: (params?: ISignOut) => Promise<void>,
}

const SignedInContext = React.createContext<ISignedInContextType>({
    isSignedIn: false,
    signedInStatus: SIGNED_IN_STATUS.loading,
    userType: USER_TYPES.guest,
    setSignedInStatus: () => { },
    signOut: async () => { },
});

const SignedInStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [signedInStatus, setSignedInStatusInternal] = useState<SIGNED_IN_STATUS>(SIGNED_IN_STATUS.loading);
    const [usrType, setUsrType] = useState<USER_TYPES>(USER_TYPES.guest);

    const signOut = async (params?: ISignOut) => {

        console.log('Params when sign out was called', params);

        if (signedInStatus !== SIGNED_IN_STATUS.signedOut) {
            setSignedInStatusInternal(SIGNED_IN_STATUS.signedOut);
            // TODO: Add routines for sign out
        } else {
            // TODO: Add routines for sign in
        }
    };

    const setSignedInStatus = ({ isSignedIn, userType }: { isSignedIn: SIGNED_IN_STATUS, userType: USER_TYPES }) => {
        setSignedInStatusInternal(isSignedIn);
        setUsrType(userType);
    };

    signedInContextGlobalFunction.signOut = signOut;

    return (
        <SignedInContext.Provider value={{
            isSignedIn: signedInStatus === SIGNED_IN_STATUS.signedIn,
            userType: usrType,
            signedInStatus: signedInStatus,
            setSignedInStatus: setSignedInStatus,
            signOut,
        }}>
            {children}
        </SignedInContext.Provider>
    );
};

export { SignedInStatusProvider, SignedInContext };
