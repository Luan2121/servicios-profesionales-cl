import React, { Fragment } from 'react';
import { useTheme } from 'bumbag';
import { StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';

type TechnicianOrderScreenNavigationProp = StackNavigationProp<
    TechnicianNavigatorParamList,
    'technician-orders'
>

type Props = {
    navigation : TechnicianOrderScreenNavigationProp 
};

const TechnicianOrderScreen = ({navigation} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    return (
        <Fragment>
            <StatusBar/>
        </Fragment>
    )
}

export default TechnicianOrderScreen;