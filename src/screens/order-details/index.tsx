import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Header } from '@components/header/header';
import { OrderNavigatorParamList } from "@navigators/orders-navigator/orders-navigator";
import { StackNavigationProp } from '@react-navigation/stack';

type PaymentScreenNavigationProp = StackNavigationProp<
    OrderNavigatorParamList,
    'order-detail'
>

type Props = {
    navigation : PaymentScreenNavigationProp 
};

const OrderDetail = ({
    navigation
} : Props) => {
    return (
        <Fragment>
            <StatusBar/>
            <Header
                title = "Order #1010"
                variant = "stack"
                navigation = {navigation}
            />
        </Fragment>
    )
};

export default OrderDetail;