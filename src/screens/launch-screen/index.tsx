import React, { Fragment } from 'react';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { ImageBackground, StatusBar, Text, View, Image } from 'react-native';
import { Box, Button , Group } from 'bumbag-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'bumbag';
import { Assets } from '@assets';
import { COPY } from "@copy";
import { atom, useAtom } from 'jotai';
import { useAuth } from '@hooks/use-auth';

export const userTypeAtom = atom<'client' | 'technician' | undefined>(undefined);

type LaunchScreenNavigationProp = StackNavigationProp<
    AuthNavigatorParamList,
    'launch-screen'
>

type Props = {
    navigation: LaunchScreenNavigationProp
}

const LaunchScreen = ({ navigation } : Props ) => {
    const { theme } = useTheme();
    const [ userType, setUserType ] = useAtom(userTypeAtom);
    const { loginAsGuest } = useAuth();
    return (
        <Fragment>
            <StatusBar backgroundColor={theme.palette.secondary} />
            <Box style = {{
                flex: 1,
                backgroundColor: theme.palette.secondary
            }}>
                <ImageBackground 
                    source = {Assets.images.bg1} 
                    style = {{ width: '100%' , height: '100%' }}
                    resizeMode="cover" 
                >
                    <ImageBackground
                        source = {Assets.images.plumber}
                        style = {{ 
                            width: '100%' , 
                            height: '100%', 
                            justifyContent: 'space-between' 
                        }}
                        resizeMode="contain"
                    >
                        <View>
                            <Image
                                style = {{
                                    alignSelf: 'center',
                                    marginTop: theme.spacing.medium
                                }}
                                source = {Assets.images.fullLogo}
                                width = {120}
                                height = {30}
                            />
                        </View>
                        <View style = {{
                            height: 280,
                            width: '100%',
                            backgroundColor: theme.palette.body,
                            borderTopStartRadius: 16,
                            borderTopEndRadius: 16,
                            padding: theme.spacing.large,
                            justifyContent: 'space-between'
                        }}>
                            <Text style = {{
                                fontWeight: 'bold',
                                fontSize: 28
                            }}>
                                { COPY["title"] }
                            </Text>
                            <Group width = "100%">
                                <Button onPress = { () => { 
                                    setUserType("client");
                                    navigation.navigate("login-screen");
                                } } palette = "secondary" flex = {1} width = "50%">
                                    <Button.Text color={theme.palette.body}>
                                        { COPY["iam-client"]}
                                    </Button.Text>
                                </Button>
                                <Button onPress = { () => { 
                                    setUserType("technician");
                                    navigation.navigate("login-screen");
                                } } palette = "secondary" flex = {1} width ="50%">
                                    <Button.Text color={theme.palette.body}>
                                        { COPY["iam-technician"] }
                                    </Button.Text>
                                </Button>
                            </Group>
                            <Text style = {{
                                color: theme.palette.muted,
                                fontSize: 14,
                                textAlign: 'center'
                            }}>
                                o
                            </Text>
                            <Button variant = "ghost" onPress = {() => {
                                loginAsGuest();
                            }}>
                                <Button.Text>
                                    Entrar como invitado
                                </Button.Text>
                            </Button>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </Box>
        </Fragment>
    )
}

export default LaunchScreen 
