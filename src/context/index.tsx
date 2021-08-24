
import React from 'react';
import { Provider as BumbagNativeProvider } from 'bumbag-native';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme } from '@theme/light-theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './auth-context';
import { Platform } from 'react-native';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const AppProviders = ( { children } : any ) => {
    return (
        <QueryClientProvider client = {queryClient}>
            <NavigationContainer>
                <BumbagNativeProvider theme = {lightTheme}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </BumbagNativeProvider>
            </NavigationContainer>
            {Platform.OS === "web" && (
                <ReactQueryDevtools/>
            )}
        </QueryClientProvider>
    )
}

export { AppProviders }