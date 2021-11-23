import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export type TechnicianNavigatorParamList = {
    'root' : any,
    'messages': any,
    'technician-orders',
    'payments': any,
    'add-payment': any
}

const Stack = createStackNavigator<TechnicianNavigatorParamList>();

const TechnicianHomeScreen  = lazy( () => import("@screens/technician-home/technician-home") );
const MessageScreen         = lazy( () => import("@screens/messages") );
const PaymentsScreen        = lazy( () => import("@screens/payments") );
const AddPaymentScreen      = lazy( () => import("@screens/add-payment") );

//Navigators
const OrdersNavigator = lazy( () => import("../orders-navigator/orders-navigator") );

const TechnicianNavigator = ({}) => {
    return(
        <Suspense fallback = {null}>
            <Stack.Navigator headerMode="none" initialRouteName="root">   
                <Stack.Screen
                    name = "root"
                    component = {TechnicianHomeScreen}
                />    
                <Stack.Screen
                    name = "messages"
                    component = {MessageScreen}
                />    
                <Stack.Screen
                    name = "technician-orders"
                    component = {OrdersNavigator}
                />    
                <Stack.Screen
                    name = "payments"
                    component = {PaymentsScreen}
                />    
                <Stack.Screen
                    name = "add-payment"
                    component = {AddPaymentScreen}
                />    
            </Stack.Navigator>
        </Suspense>
    );
}

export default TechnicianNavigator ;