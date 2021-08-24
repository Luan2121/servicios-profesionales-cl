import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export type AuthNavigatorParamList = {
    'login-screen': any,
    'sign-up-screen': any,
    'launch-screen': any,
    'select-comuna-screen': any,
    'select-city-screen': any
}

const Stack = createStackNavigator<AuthNavigatorParamList>();
// Screens
const LoginScreen        = lazy( () => import("@screens/login-screen") );
const SignUpScreen       = lazy( () => import("@screens/sign-up-screen") );
const LaunchScreen       = lazy( () => import("@screens/launch-screen") );
const SelectComunaScreen = lazy( () => import( "@screens/service-details-screen/select-comuna-screen") );
const SelectCityScreen   = lazy( () => import("@screens/select-city-screen") );

const AuthNavigator = () => {
    return (
        <Suspense fallback = {null}>
            <Stack.Navigator headerMode="none" initialRouteName="launch-screen">  
                <Stack.Screen 
                    name = "launch-screen"
                    component = {LaunchScreen}
                />    
                <Stack.Screen
                    name = "login-screen"
                    component = {LoginScreen}
                />
                <Stack.Screen
                    name = "sign-up-screen"
                    component = {SignUpScreen}
                />    
                <Stack.Screen
                    name = "select-comuna-screen"
                    component = {SelectComunaScreen}
                />
                <Stack.Screen
                    name = "select-city-screen"
                    component = {SelectCityScreen}
                />
            </Stack.Navigator>
        </Suspense>
    );
}

export default AuthNavigator;