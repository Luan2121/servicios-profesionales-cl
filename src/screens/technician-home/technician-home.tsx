import { Header } from '@components/header/header';
import React, { Fragment } from 'react';
import { StatusBar, Text } from 'react-native';
import { Stack, Box, Menu } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { Avatar } from '@components/avatar/avatar';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCountMessages } from '@hooks/models/use-messages';
import { Alert } from '@components/alerts/alerts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : messageCounter } = useCountMessages();
    return (
        <Fragment>
            <StatusBar/>
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
        </Fragment>
    );
};

export default TechnicianHome;