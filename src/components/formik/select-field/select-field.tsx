import React from 'react';
import { useField } from 'formik';
import { Text, View } from 'react-native';
import { useTheme } from 'bumbag';
import { Input, InputProps, FieldWrapperProps, FieldWrapper, MenuItemProps, Menu } from 'bumbag-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';


interface Props extends Pick<InputProps,'placeholder' | 'size' | 'disabled'> , FieldWrapperProps {
    name : string,
    screen : string,
    params ?: object
}

interface MenuItemFieldProps extends MenuItemProps {
    name : string,
    screen : string,
    params ?: object,
    label: string,
}

const SelectField = ({
    size,
    placeholder,
    name,
    params,
    screen,
    disabled
} : Props) => {
    const [ field , meta, helpers ] = useField(name);
    const navigation = useNavigation();
    const isError = meta.error && meta.touched;
    const state = isError ? "danger" : undefined;
    const navState = useNavigationState( state => state );
    const error = isError ? meta.error : "";

    /*const validationText = ( typeof error === 'object' 
        ? Object.values(error).pop()
        : error ) as string;*/

    const value = typeof field.value === 'object' 
        ? field.value['name'] ?? ''
        : field.value;

    return (
        <FieldWrapper state = {state} >
            <Input 
                size = {size} 
                placeholder = {placeholder} 
                caretHidden = {true} 
                showSoftInputOnFocus = {false} 
                value={value}
                disabled = {disabled}
                onFocus = {(e) => {
                    if(!disabled){
                        e.preventDefault();
                        navigation.navigate(screen, {
                            ...params,
                            value: "",
                            state: {
                                index: navState.index,
                                routes: navState.routes
                            },
                            onGoBack: ( selection : string | object ) => {
                                helpers.setTouched(true);
                                helpers.setValue(selection);
                            }
                        });
                    }
                }} 
            />
        </FieldWrapper>
    );
}

const MenuItemField = ({
    name,
    label,
    disabled,
    screen,
    params,
    ...restProps
} : MenuItemFieldProps) => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const [ field, meta, helpers ] = useField(name);

    const value = typeof field.value === 'object' 
        ? field.value?.['name'] ?? ''
        : field.value;

    return(
        <Menu.Item 
            onPress = { () => { 
                if(!disabled){
                    navigation.navigate(screen, {
                        ...params,
                        value: "",
                        onGoBack: ( selection : string | object ) => {
                            helpers.setTouched(true);
                            helpers.setValue(selection);
                        }
                    });
                }
            }} 
            iconAfter = "chevron-right"
            iconAfterProps = {{ color: 'primary' }} 
            {...restProps}
        >
            {value ? 
                <View>
                    <Text style = {{
                        fontSize: 9,
                        justifyContent: 'center',
                        color: theme.palette.muted
                    }}>
                        { label }
                    </Text>
                    <Text style = {{
                        color: '#000000'
                    }}>
                        { value }
                    </Text>
                </View>
                : <Text style = {{
                    color: theme.palette.muted
                }}>
                    { label }
                </Text>
            }
        </Menu.Item>
    );
}

SelectField.MenuItem = MenuItemField;

export { SelectField };