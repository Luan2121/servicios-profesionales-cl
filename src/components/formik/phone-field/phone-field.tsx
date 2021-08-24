import React, { Fragment } from 'react';
import { FieldWrapper, Input, Box } from 'bumbag-native';
import { View, Text } from 'react-native';
import { FormikFieldProps } from '@types';
import { Flags } from '@components/icons/flags/flags';
import { useTheme } from 'bumbag';
import { TextField } from '../text-field/text-field';

const PhoneField = ({
    name,
    size,
    placeholder,
    ...restProps
}: FormikFieldProps) => {
    const { theme } = useTheme();
    return (
        <Box flexDirection = "row">
            <View style={{
                height: 55,
                borderWidth: 1,
                borderColor: 'rgb(217, 217, 225)',
                padding: theme.spacing.medium,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(252, 252, 253)',
                flexDirection: 'row',
                borderRadius: 6,
                marginRight: theme.spacing.medium,
                marginTop: 7.5
            }} >
                <Flags name="chile" />
                <Text style = {{
                    marginLeft: theme.spacing.small,
                    fontSize: 18
                }}>
                    +56
                </Text>
            </View>
            <View style = {{
                flex: 1
            }} >
                <TextField name = {name} size = {size} placeholder = {placeholder} {...restProps} />
            </View>
        </Box>
    );
}

export { PhoneField };