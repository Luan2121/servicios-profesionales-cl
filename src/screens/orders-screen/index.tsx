import React, { Fragment } from 'react';
import { StatusBar, View, ScrollView, FlatList, Text, SafeAreaView } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { OrderNavigatorParamList } from '@navigators/orders-navigator/orders-navigator';
import { Header } from '@components/header/header';
import { useAuth } from '@hooks/use-auth';
import { useOrders } from '@hooks/models/use-orders';
import { Button } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { OrderItem as TOrderItem } from '@types';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LoaderManager } from '@components/loader-manager/loader-manager';

type OrderScreenNavigationProp = BottomTabNavigationProp<
    OrderNavigatorParamList,
    'root'
>

type Props = {
    navigation : OrderScreenNavigationProp 
}


const OrderScreen = ({
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : orders , isLoading } = useOrders(user); 
    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView>
            <Header
                title = "Tus ordenes"
                variant = "stack"
                navigation = {navigation}
            />
                <LoaderManager isLoading = {isLoading} >
                    <ScrollView style = {{
                        flex: 1
                    }} >
                        <FlatList
                            data = {orders}
                            renderItem = {({ item }) => (
                                <View style = {{
                                    marginBottom: theme.spacing.small
                                }}>
                                    <OrderItem item = {item} navigation = {navigation} />
                                </View>
                            )}
                        />
                    </ScrollView>
                </LoaderManager>
            </SafeAreaView>
        </Fragment>
    )
}

type OrderItemProps = {
    item: TOrderItem,
    navigation: OrderScreenNavigationProp
};

const OrderItem = ({ item, navigation } : OrderItemProps) => {
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
                <Button onPress = {() => {
                    navigation.navigate("order-detail", { order: item })
                }}>
                    <EvilIcons name="pencil" size={24} color="black" />
                </Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default OrderScreen;