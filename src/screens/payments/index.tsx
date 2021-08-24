
import React, { Fragment } from 'react';
import { useTheme } from 'bumbag';
import { StatusBar, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';
import { Header } from '@components/header/header';
import { FAB } from 'react-native-elements';
import { EmptySpace } from '@components/empty-space/empty-space';

type PaymentScreenNavigationProp = StackNavigationProp<
    TechnicianNavigatorParamList,
    'payments'
>

type Props = {
    navigation : PaymentScreenNavigationProp 
};

const PaymentScreen = ({navigation} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    return (
        <Fragment>
            <StatusBar/>
            <Header
                variant = "stack"
                title = "Tus abonos"
                navigation = {navigation}
            />
            <EmptySpace show = {true} title = "Aun no tienes abonos">
                <View style = {{
                    padding: theme.spacing.medium
                }}>
                    
                </View>
            </EmptySpace>
            <FAB 
                onPress = {() => {
                    navigation.navigate("add-payment");
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

export default PaymentScreen;