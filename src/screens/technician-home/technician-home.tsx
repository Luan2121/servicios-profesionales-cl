import React, { Fragment, useEffect } from 'react';
import { Header } from '@components/header/header';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { Stack, Box, Menu } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { Avatar } from '@components/avatar/avatar';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCountMessages } from '@hooks/models/use-messages';
import { useBackgroundLocationTask, useLocation, useMutateLocation, useNotificationChannel } from '@hooks/use-locations';
import { Alert } from '@components/alerts/alerts';
import { configureLocationTracker } from '@tasks/location-tasks';
import { useClient } from '@hooks/use-client';

type AccountScreenNavigationProp = StackNavigationProp<
    TechnicianNavigatorParamList,
    'root'
>

type Props = {
    navigation : AccountScreenNavigationProp 
}

const TechnicianHome = ({
    navigation
} : Props) => {
    const client = useClient();
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : messageCounter } = useCountMessages();
    const { mutate : storeLocation } = useMutateLocation();
    const { location } = useLocation({ revalidationInterval: 300000 });

    // Location tracker scripts
    useEffect( () => {
        storeLocation({ 
            rut: user?.rut ?? "", 
            lat: location?.coords.latitude.toString() || "" ,
            lng: location?.coords.longitude.toString() || "" 
        });
    } , [ location, storeLocation ]);

    useEffect( () => {
        configureLocationTracker({
            user_rut: user?.rut,
            client
        });
    } , []);

    useBackgroundLocationTask({ revalidationInterval: 300000 });
    useNotificationChannel();

    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView style = {{ flex: 1 }}>
                <Header>
                    <Stack padding="medium" spacing = "small">
                            <Box justifyContent = "center" alignItems="center">
                                <Avatar size = "large" />
                            </Box>
                            <Box>
                                <Text style = {{
                                    fontSize: 18,
                                    color: theme.palette.body,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {user?.username}
                                </Text>
                            </Box>
                        </Stack>
                </Header>
                <Box marginTop = "small">
                    { !( (messageCounter as number) <= 0) && (
                        <Box padding = "medium">
                            <Alert
                                tone = "warning"
                                icon = "warning"
                                action = {{
                                    text: "Ver mas",
                                    onPress: () => {
                                        navigation.navigate("messages")
                                    }
                                }}
                            >
                                Tienes {messageCounter} sin leer
                            </Alert>
                        </Box>
                    )}
                    <Menu backgroundColor="body" hasDividers={true} >
                        <Menu.Item onPress = {() => { navigation.navigate("messages") }} iconAfterProps = {{ color: 'primary' }} iconAfter = "chevron-right">
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Mensajes
                            </Text>
                        </Menu.Item>
                        <Menu.Item onPress = {() => { navigation.navigate("technician-orders") } } iconAfterProps = {{ color: 'primary' }} iconAfter = "chevron-right">
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Mis ordenes
                            </Text>
                        </Menu.Item>
                        <Menu.Item onPress = {() => { navigation.navigate("payments") }} iconAfter = "chevron-right" iconAfterProps = {{ color: 'primary' }} >
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Abonos
                            </Text>
                        </Menu.Item>
                    </Menu>
                </Box>
            </SafeAreaView>
        </Fragment>
    );
};

export default TechnicianHome;