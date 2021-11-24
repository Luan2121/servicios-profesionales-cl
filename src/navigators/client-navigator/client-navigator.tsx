import React, { lazy } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "bumbag";
import { PreOrder, Service, WebPayResult } from "@types";
// Components
import { TabBar } from "@components/tab-bar/tab-bar";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from "@hooks/use-auth";
import { Fragment } from "react";

export type ClientNavigatorStack = {
    'service-details': {
        service : Service
    },
    'select-comuna-screen': any,
    'select-service-screen': {
        service : Service,
        value: string,
        onGoBack: any
    },
    'select-modality-screen': any,
    'select-city-screen': any,
    'gateway-screen': {
        order: PreOrder,
        webpay: WebPayResult
    },
    'checkout-screen': {
        order: PreOrder
    }
    'tabs': any,
    'profile': any
}

export type ClientNavigatorTab = {
    'home': any,
    'orders': any,
    'account': any,
    'service-details': {
        service : Service
    },
}

const Tab = createBottomTabNavigator<ClientNavigatorTab>();
const Stack = createStackNavigator<ClientNavigatorStack>();

// Screens 
const HomeScreen            = lazy( () => import( "@screens/home-screen") );
const ServiceDetailScreen   = lazy( () => import( "@screens/service-details-screen") );
const SelectComunaScreen    = lazy( () => import( "@screens/service-details-screen/select-comuna-screen") );
const SelectServiceScreen   = lazy( () => import( "@screens/service-details-screen/select-service-screen") );
const SelectModalityScreen  = lazy( () => import( "@screens/service-details-screen/select-modality-screen") );
const GatewayScreen         = lazy( () => import( "@screens/gateway-screen") );
const CheckoutScreen        = lazy( () => import( "@screens/checkout-screen") );
const ProfileScreen         = lazy( () => import( "@screens/profile-screen") );
const SelectCityScreen   = lazy( () => import("@screens/select-city-screen") );

// Navigators
const AccountNavigator = lazy( () => import( "../account-navigator/account-navigator" ) );
const OrdersNavigator = lazy( () => import("../orders-navigator/orders-navigator") );

const ClientNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator headerMode = 'none' initialRouteName = "tabs">
            {( () => {
                return (
                    <Fragment> 
                        <Stack.Screen
                            name = "tabs"
                            component = {ClientTabs}
                        />
                        <Stack.Screen
                            name = "service-details"
                            component = {ServiceDetailScreen}
                        />
                        <Stack.Screen
                            name = "checkout-screen"
                            component = {CheckoutScreen}
                        />
                        <Stack.Screen
                            name = "select-comuna-screen"
                            component = {SelectComunaScreen}
                        />
                        <Stack.Screen
                            name = "select-service-screen"
                            component = {SelectServiceScreen}
                        />
                        <Stack.Screen
                            name = "select-modality-screen"
                            component = {SelectModalityScreen}
                        />
                        <Stack.Screen
                            name = "gateway-screen"
                            component = {GatewayScreen}
                        />
                        <Stack.Screen 
                            name = "profile"
                            component = {ProfileScreen}
                        />
                    </Fragment>
                );
            })()}
        </Stack.Navigator>
    )
}

const ClientTabs = () => {
    const { theme } = useTheme();
    const { isGuest, user } = useAuth();
    return (
        <Tab.Navigator 
            initialRouteName = "home"  
            tabBar = { props => <TabBar {...props}/> }
            tabBarOptions = {{
                inactiveTintColor: theme.palette.mutedPrimary,
                activeTintColor: theme.palette.body
            }}
        >
            {( !isGuest && user?.hasProfile ) && (
                <Tab.Screen
                    name = "account"
                    component = {AccountNavigator}
                    options = {{
                        tabBarIcon: (props) => ( <AntDesign {...props} name = "user" color = {props.color} size = {24} /> ),
                    }}
                />
            )}
            <Tab.Screen 
                name = "home"
                component = {HomeScreen}
                options = {{
                    tabBarIcon: (props) => ( <MaterialCommunityIcons {...props} name = "home-account" color = {props.color} size = {24} /> )
                }}
            />
            { ( !isGuest && user?.hasProfile ) && (
                <Tab.Screen
                    name = "orders"
                    component = {OrdersNavigator}
                    options = {{
                        tabBarIcon: (props) => ( <MaterialCommunityIcons {...props} name = "card-search-outline" color = {props.color} size = {24} /> )
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

export default ClientNavigator;