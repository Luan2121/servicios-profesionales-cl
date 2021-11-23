import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderItem } from '@types';

export type OrderNavigatorParamList = {
    'root' : any,
    'order-detail': {
        order: OrderItem
    },
    'mutate-report-screen': {
        order: OrderItem
    }
}

const Stack = createStackNavigator<OrderNavigatorParamList>();
// Screens
const OrderScreen = lazy( () => import("@screens/orders-screen") );
const OrderDetailScreen = lazy( () => import("@screens/order-details") );
const MutateReportScreen = lazy( () => import("@screens/mutate-report-screen") );

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
                <Stack.Screen
                    name = "mutate-report-screen"
                    component = {MutateReportScreen}
                />
            </Stack.Navigator>
        </Suspense>
    );
}

export default OrderNavigator;