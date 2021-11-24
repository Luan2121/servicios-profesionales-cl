import React, { Fragment } from 'react';
import { useTheme } from 'bumbag';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { Box, Stack, Menu } from 'bumbag-native';
import { Header } from '@components/header/header';
import { Avatar } from '@components/avatar/avatar';
import { AccountNavigatorParamList } from '@navigators/account-navigator/account-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@hooks/use-auth';

type AccountScreenNavigationProp = StackNavigationProp<
    AccountNavigatorParamList,
    'root'
>

type Props = {
    navigation : AccountScreenNavigationProp 
}

const AccountScreen = ({navigation} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView style = {{ flex: 1 }}>
                <Header variant="default" >
                    <Stack padding="medium" spacing = "small">
                        <Box>
                            <Text style = {{
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: theme.palette.body,
                                textAlign: 'center'
                            }}>
                                Mi cuenta
                            </Text>
                        </Box>
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
                    <Menu backgroundColor="body" hasDividers={true} >
                        <Menu.Item onPress = {() => { navigation.navigate("my-data") }} iconAfterProps = {{ color: 'primary' }} iconAfter = "chevron-right">
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Mis datos
                            </Text>
                        </Menu.Item>
                        <Menu.Item onPress = {() => { navigation.navigate("my-directions") } } iconAfterProps = {{ color: 'primary' }} iconAfter = "chevron-right">
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Mis direcciones
                            </Text>
                        </Menu.Item>
                        <Menu.Item onPress = {() => { navigation.navigate("update-password") }} iconAfter = "chevron-right" iconAfterProps = {{ color: 'primary' }} >
                            <Text style = {{
                                color: theme.palette.muted
                            }}>
                                Actualizar contraseña
                            </Text>
                        </Menu.Item>
                    </Menu>
                </Box>
            </SafeAreaView>
        </Fragment>
    )
}

export default AccountScreen;