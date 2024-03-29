import React from 'react';
import { lightTheme } from '@theme/light-theme';
import { View } from 'react-native';
import { ColorValue } from 'react-native';
import { Image } from 'react-native';
import { Assets } from '@assets';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
    const color = ( lightTheme.palette?.secondary || "#FFFFFF" ) as ColorValue;
    return(
        <SafeAreaView style = {{ flex: 1 }}>
            <View style = {{
                flex: 1,
                backgroundColor: color,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    style = {{
                        width: '60%',
                        resizeMode: 'contain',
                        height: 150
                    }}
                    source = {Assets.images.fullLogo}
                />
            </View>
        </SafeAreaView>

    )
}

export default SplashScreen;