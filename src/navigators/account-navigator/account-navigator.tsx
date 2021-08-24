import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export type AccountNavigatorParamList = {
    'root' : any,
    'my-data': any,
    'my-directions': any,
    'mutate-direction-screen': any,
    'update-password': any
}

const Stack = createStackNavigator<AccountNavigatorParamList>();
// Screens
const AccountScreen  = lazy( () => import("@screens/account-screen") );
const UserDataScreen = lazy( () => import("@screens/user-data-screen") );
const UserDirectionsScreen = lazy( () => import("@screens/user-directions-screen") );
const MutateDirectionScreen = lazy( () => import("@screens/mutate-direction-screen") );
const UpdatePasswordScreen = lazy( () => import("@screens/update-password-screen") );

const AccountNavigator = () => {
    return (
        <Suspense fallback = {null}>
            <Stack.Navigator headerMode="none" initialRouteName="root">   
                <Stack.Screen
                    name = "root"
                    component = {AccountScreen}
                />
                <Stack.Screen
                    name = "my-data"
                    component = {UserDataScreen}
                />
                <Stack.Screen 
                    name = "my-directions"
                    component = {UserDirectionsScreen}
                />    
                <Stack.Screen 
                    name = "mutate-direction-screen"
                    component = {MutateDirectionScreen}
                />
                <Stack.Screen 
                    name = "update-password"
                    component = {UpdatePasswordScreen}
                />     
            </Stack.Navigator>
        </Suspense>
    );
}

export default AccountNavigator;