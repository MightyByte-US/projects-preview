import React, { ReactNode, useContext, useEffect } from 'react';

import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../components/screens/Home';
import { NotFound } from '../components/screens/NotFound';
import { envs } from '../../env';
import { LoadingPage } from '../components/helperComponents/LoadingPage';
import { ISignedInContextType, SignedInContext, SIGNED_IN_STATUS } from '../context/SignedInContext';
import { Login } from '../components/screens/Login';
import { USER_TYPES } from '../typesInterfacesEnums/enums';
import { ComponentsDemo } from '../components/screens/ComponentsDemo';

export type RootStackParamList = {
    Login: undefined
    Home: { userType: USER_TYPES }
    ComponentsDemo: undefined
    NotFound: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navRef = createNavigationContainerRef<RootStackParamList>();

export const getRootNavRef = () => {
    return navRef.isReady() ? navRef : undefined;
};

const config = {
    screens: {
        Login: '/',
        Home: 'home/:userType',
        ComponentsDemo: 'componentsDemo',
        NotFound: '*',
    },
};

const linking = {
    prefixes: [
        envs.WEBSITE_BASE_URL,
    ],
    config,
};

const RootNavigation = () => {
    const { isSignedIn, signedInStatus, setSignedInStatus } = useContext<ISignedInContextType>(SignedInContext);
    console.log('----- RUNNING THIS', signedInStatus);
    // TODO: Remove: This is used just for demo purposes to show how navigator reacts to signed in changes.
    useEffect(() => {
        if (signedInStatus === SIGNED_IN_STATUS.loading) {
            setTimeout(() => setSignedInStatus({ isSignedIn: SIGNED_IN_STATUS.signedOut, userType: USER_TYPES.guest }), 1000);
        }
    }, [isSignedIn, setSignedInStatus, signedInStatus]);

    const renderGuestRoutes = (): ReactNode => {
        if (!isSignedIn) {
            return (
                <>
                    <Stack.Screen name="Login" component={Login} />
                </>
            );
        }

        return null;
    };

    const renderStudentRoutes = (): ReactNode => {
        if (isSignedIn) {
            return (
                <>

                </>
            );
        }

        return null;
    };

    const renderTeacherRoutes = (): ReactNode => {
        if (isSignedIn) {
            return (
                <>

                </>
            );
        }

        return null;
    };



    const renderRoutes = () => {
        return (
            <>
                {renderGuestRoutes()}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ComponentsDemo" component={ComponentsDemo} />
                {renderTeacherRoutes()}
                {renderStudentRoutes()}
            </>
        );
    };


    if (signedInStatus === SIGNED_IN_STATUS.loading) {
        return <LoadingPage />;
    }

    return (
        <NavigationContainer linking={linking} ref={navRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {renderRoutes()}
                <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default RootNavigation;
