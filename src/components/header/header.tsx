import React from 'react';
import { ButtonContext, Icon, useTheme } from 'bumbag-native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Button } from 'bumbag-native';
import { Avatar } from '../avatar/avatar';
import { ReactElement } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@hooks/use-auth';

type HeaderProps = {
    variant ?: 'stack' | 'default',
    title ?: string,
    goBack ?: boolean,
    children ?: ReactElement,
    navigation ?: any
}

const Header = ( { 
    children , 
    variant = 'default', 
    title,
    navigation
} : HeaderProps ) => {
    const { theme } = useTheme();
    const auth = useAuth();
    const handlePressExit = () => {
        auth.logout();
    }
    const handlePressGoBack = () => {
        if( navigation && 'goBack' in navigation ){
            navigation.goBack();
        }
    }
    if(variant === 'default'){
        return (
            <View style = {{
                backgroundColor: theme.palette.primary
            }}>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: theme.spacing.medium
                }}>
                    <Avatar/>
                    <Button onPress = {handlePressExit}  palette = "mutedPrimary" size = "small" iconBefore = "info-circle" iconBeforeProps = {{ color: theme.palette.body }} >
                        <Button.Text color = "body">
                            salir
                        </Button.Text>
                    </Button>
                </View>
                {children}
            </View>
        );
    }

    if( variant === 'stack' ){
        return (
            <View style = {{
                padding: theme.spacing.large
            }}>
                <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Button palette="primary" onPress = {handlePressGoBack} >
                        <AntDesign 
                            name="arrowleft" 
                            size={18} 
                            color={theme.palette.body}
                        />
                    </Button>
                    {title && (
                        <Text style = {{
                            fontSize: 18,
                            marginLeft: theme.spacing.medium,
                            color: theme.palette.primary,
                            fontWeight: 'bold'
                        }}>
                            {title}
                        </Text>
                    )}
                </View>
                {children}
            </View>
        )
    }

    throw new Error(
        'invalid variant'
    );
}

export { Header }