import React , { Fragment, useState, useEffect } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { Menu } from 'bumbag-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientNavigatorStack } from '@navigators/client-navigator/client-navigator';
import { Header } from '@components/header/header';
import { RouteProp } from '@react-navigation/native';


type SelectServiceScreenNavigationProp = StackNavigationProp<
    ClientNavigatorStack,
    'select-service-screen'
>

type SelectServiceScreenRouteProp = RouteProp<
    ClientNavigatorStack,
    'select-service-screen'
>

type Props = {
    navigation : SelectServiceScreenNavigationProp,
    route: SelectServiceScreenRouteProp
}

const SelectServiceScreen = ({ navigation, route } : Props) => {
    const subServices = route.params.service.subServices;
    const [value,setValue] = useState(route.params.value || "");
    const [selection,setSelection] = useState<any>();
    useEffect( () => {
        if( selection ){
            route.params.onGoBack(selection)
            navigation.goBack();
        }
    } , [selection]);

    return (
        <Fragment>
            <StatusBar />
            <Header
                title = "Seleccionar Comuna"
                navigation = {navigation}
                variant = "stack"
            />
            <ScrollView style = {{
                flex: 1
            }}>
                <Menu>
                    <Menu.OptionGroup 
                        alignCheck="right" 
                        type = "radio" 
                        value = {value}
                        onChange = {(value) => {
                            const [ id ] = typeof value === 'string' ? value.split("-") : value;
                            const selection = subServices?.find( service => service.id === id );
                            setValue(value as string);
                            setSelection(selection);
                        }}
                    >
                        {subServices?.map( service => (
                            <Menu.OptionItem 
                                key = {service.id} 
                                value = {`${service.id}-${service.name}`}
                            >
                                {service.name}
                            </Menu.OptionItem>
                        ))}
                    </Menu.OptionGroup>
                </Menu>
            </ScrollView>
        </Fragment>
    )
}

export default SelectServiceScreen;