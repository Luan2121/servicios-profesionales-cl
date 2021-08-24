import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { useTheme } from 'bumbag';
import { Header } from '@components/header/header';
import { Menu } from 'bumbag-native';
import { useCities } from '@hooks';
import { useNavigationState } from '@react-navigation/native';

type SelectCityScreenNavigationProp = StackNavigationProp<
    AuthNavigatorParamList,
    'select-city-screen'
>

type Props = {
    navigation : SelectCityScreenNavigationProp,
    route : any
}

const SelectCityScreen = ({
    route,
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { data : cities } = useCities();
    const [value,setValue] = useState(route.params.value || "");
    const [selection,setSelection] = useState<any>();
    const state = route.params.state;

    useEffect( () => {
        if( selection ){
            route.params.onGoBack(selection)
            navigation.reset(state);
        }
    } , [selection]);

    return (
        <Fragment>
            <Header
                title = "Seleccionar Ciudad"
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
                            const selection = cities?.find( city => city.id === id );
                            setValue(value);
                            setSelection(selection);
                        }}
                    >
                        {cities?.map( city => (
                            <Menu.OptionItem 
                                key = {city.id} 
                                value = {`${city.id}-${city.name}`}
                            >
                                {city.name}
                            </Menu.OptionItem>
                        ))}
                    </Menu.OptionGroup>
                </Menu>
            </ScrollView>
        </Fragment>
    )
}

export default SelectCityScreen;