import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderItem } from '@types';

export type OrderNavigatorParamList = {
    'root' : any,
    'order-detail': {
        order: OrderItem
    }
}

const Stack = createStackNavigator<OrderNavigatorParamList>();
// Screens
const OrderScreen = lazy( () => import("@screens/orders`-screen/index") );
const OrderDetailScreen = lazy( () => import("@screens/order-details") );

const OrderNavigator = () => {
    return (
        <Suspense fallback = {null}>
            <Stack.Navigator headerMode="none" initialRouteName="root">   
                <Stack.Screen
                    name = "root"
                    component = {OrderScreen}
                />
                <Stack.Screen
                    name = "order-detail"
                    component = {OrderDetailScreen}
                />   
            </Stack.Navigator>
        </Suspense>
    );
}

export default OrderNavigator;