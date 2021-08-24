import React, { useState } from 'react';
import { Input, InputProps } from 'bumbag-native';
import { View, Text, TouchableHighlight } from 'react-native';
import { useTheme } from 'bumbag';

export interface SearchProps extends InputProps {
    getOptions: ( (search: string) => any[] ) | ( (search: string) => Promise<any[]> ),
    getOptionLabel ?: ( option : any ) => string
}

const Search = ( { 
    getOptions, 
    getOptionLabel, 
    value,
    onChangeText,
    ...props 
} : SearchProps ) => {
    const [ options , setOptions ] = useState<any>([]);
    const [ isOpen, setOpen ] = useState(false);
    const { theme } = useTheme();
    return (
        <View style = {{
            position: 'relative'
        }}>
            <Input
                {...props}
                value = {value}
                onChangeText = {(text) => {
                    onChangeText?.(text);
                    const searchResults = getOptions(text);
                    if('then' in searchResults){
                        searchResults.then( data => {
                            setOptions(data);
                            setOpen(true);
                        })
                    }else {
                        console.log("no options")
                    }
                }}
            />
            {!!options.length && isOpen && (
                <View style = {{
                    position: 'relative',
                    bottom: 10,
                    width: '100%',
                    left: 0,
                    zIndex: 5000,
                    backgroundColor: theme.palette.body,
                    padding: theme.spacing.small,
                    borderRadius: 16
                }}>
                    {options.map( (option,id) => {
                        const label = typeof getOptionLabel === "function"
                            ? getOptionLabel(option)
                            : options?.label as string;
                        if(!label){

                        }
                        return (
                            <TouchableHighlight
                                key = {`option=${id}`} 
                                underlayColor = {'#ebe9ed'}
                                activeOpacity = {0.6}
                                onPress = {() => {
                                    setOpen(false);
                                    onChangeText?.(label);
                                }}
                            >
                                <View style = {{
                                    paddingVertical: 16,
                                    paddingHorizontal: 16
                                }}>
                                    <Text style = {{
                                        fontSize: 16
                                    }}>
                                        {label}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </View>
            )}
        </View>
    );
}

export { Search };