import React, { Fragment } from 'react';
import { StatusBar, View, ScrollView, FlatList, Text } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ClientNavigatorTab } from '@navigators/client-navigator/client-navigator';
import { Header } from '@components/header/header';
import { useAuth } from '@hooks/use-auth';
import { useOrders } from '@hooks/models/use-orders';
import { Button } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { OrderItem as TOrderItem } from '@types';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type AccountScreenNavigationProp = BottomTabNavigationProp<
    ClientNavigatorTab,
    'orders'
>

type Props = {
    navigation : AccountScreenNavigationProp 
}


const OrderScreen = ({
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : orders } = useOrders(user); 

    console.log(orders);

    return (
        <Fragment>
            <StatusBar/>
            <Header
                title = "Tus ordenes"
                variant = "stack"
                navigation = {navigation}
            />
            <ScrollView style = {{
                flex: 1
            }} >
                <FlatList
                    data = {orders}
                    renderItem = {({ item }) => (
                        <View style = {{
                            marginBottom: theme.spacing.small
                        }}>
                            <OrderItem item = {item} />
                        </View>
                    )}
                />
            </ScrollView>
        </Fragment>
    )
}

type OrderItemProps = {
    item: TOrderItem
};

const OrderItem = ({ item } : OrderItemProps) => {
    const { theme } = useTheme();
    return (
        <TouchableWithoutFeedback>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: theme.spacing.medium
            }}>
                <Text>
                    {item.name}
                </Text>
                <Button>
                    <EvilIcons name="pencil" size={24} color="black" />
                </Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default OrderScreen;