import { Header } from '@components/header/header';
import React , { Fragment } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from 'bumbag';
import { FAB } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountNavigatorParamList } from '@navigators/account-navigator/account-navigator';
import { EmptySpace } from '@components/empty-space/empty-space';
import { useDeleteDirection, useDirections } from '@hooks/models/use-directions';
import { useAuth } from '@hooks/use-auth';
import { DirectionTile } from '@components/direction-tile/direction-tile';
type UserDirectionsNavigationProp = StackNavigationProp<
    AccountNavigatorParamList,
    "my-directions"
>

type Props = {
    navigation: UserDirectionsNavigationProp
}

const UserDirectionsScreen = ({
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : directions } = useDirections(user);
    const { mutate : deleteDirection } = useDeleteDirection();
    return (
        <Fragment>
            <Header
                title = "Tus direcciones"
                variant = "stack"
                navigation = {navigation}
            />
            <EmptySpace show = {!directions?.length} title = "Aun no tienes direcciones">
                <View style = {{
                    padding: theme.spacing.medium
                }}>
                    <FlatList 
                        data = {directions}
                        ItemSeparatorComponent = {() => (
                            <View style = {{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderBottomColor: theme.palette.muted
                            }} />
                        )}
                        renderItem = {({item}) => (
                            <DirectionTile item = {item} onDelete = {() => {
                                deleteDirection({
                                    directionId: item.id,
                                    rut: user?.rut as string
                                });
                            }} />
                        )}
                    />
                </View>
            </EmptySpace>
            <FAB 
                onPress = {() => {
                    navigation.navigate("mutate-direction-screen");
                }}
                buttonStyle = {{
                    borderRadius: 30,
                    backgroundColor: theme.palette.primary
                }}
                placement = "right"
                icon = {{
                    name: 'add',
                    color: '#FFFFFF'
                }}
            />
        </Fragment>
    )
}

export default UserDirectionsScreen;