import React, { Fragment, useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { useTheme } from 'bumbag';
import { Header } from '@components/header/header';
import { Menu } from 'bumbag-native';
import { useComunas } from '@hooks';

type SelectComunaScreenNavigationProp = StackNavigationProp<
    AuthNavigatorParamList,
    'select-comuna-screen'
>

type Props = {
    navigation : SelectComunaScreenNavigationProp,
    route : any
}

const SelectComunaScreen = ({
    route,
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { data : comunas } = useComunas(route.params.cityId ?? 1);
    const [value,setValue] = useState(route.params.value || "");
    const [selection,setSelection] = useState<any>();

    useEffect( () => {
        if( selection ){
            route.params.onGoBack(selection)
            navigation.goBack();
        }
    } , [selection]);

    return (
        <SafeAreaView style = {{ flex: 1 }}>
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
                            const selection = comunas?.find( city => city.id === id );
                            setValue(value);
                            setSelection(selection);
                        }}
                    >
                        {comunas?.map( comuna => (
                            <Menu.OptionItem 
                                key = {comuna.id} 
                                value = {`${comuna.id}-${comuna.name}`}
                            >
                                {comuna.name}
                            </Menu.OptionItem>
                        ))}
                    </Menu.OptionGroup>
                </Menu>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SelectComunaScreen;