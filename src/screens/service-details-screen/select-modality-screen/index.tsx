import React, { Fragment, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '@components/header/header';
import { Menu } from 'bumbag-native';
import { ClientNavigatorStack } from '@navigators/client-navigator/client-navigator';

type SelectModalityScreenNavigationProp = StackNavigationProp<
    ClientNavigatorStack,
    'select-modality-screen'
>

type Props = {
    navigation : SelectModalityScreenNavigationProp,
    route : any
}

const SelectModalityScreen = ({
    route,
    navigation
} : Props) => {
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
                            //const selection = comunas?.find( city => city.id === id );
                            const selection = value;
                            setValue(value);
                            setSelection(selection);
                        }}
                    >
                        {modalities.map( modality => (
                            <Menu.OptionItem 
                                key = {modality} 
                                value = {`${modality}`}
                            >
                                {modality}
                            </Menu.OptionItem>
                        ))}
                    </Menu.OptionGroup>
                </Menu>
            </ScrollView>
        </Fragment>
    )
}

const modalities = [
    'Visita Evaluativa',
    'Presupuesto Online'
];

export default SelectModalityScreen;