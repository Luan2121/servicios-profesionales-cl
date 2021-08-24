//bootstrap
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import React from 'react';
import { AppProviders } from '@context';
import { useAppConfig } from '@hooks/use-app-config';
import SplashScreen from '@screens/splash-screen';
import AppNavigator from '@navigators/app-navigator/app-navigator';

export default function App() {
  return (
    <AppProviders>
      <AppWrapper/>    
    </AppProviders>
  );
}

const AppWrapper = () => {
  const { showSplash } = useAppConfig();
  if(showSplash){
    return <SplashScreen/>
  }
  return <AppNavigator/>
}