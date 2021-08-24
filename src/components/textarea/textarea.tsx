import React from 'react';
import { useTheme } from 'bumbag';
import { TextInput, TextInputProps } from 'react-native';

export interface TextAreaProps extends TextInputProps {}

const TextArea = ({
    numberOfLines = 6,
    ...restProps
}: TextAreaProps) => {
    const { theme } = useTheme();
    return (
        <TextInput
            {...restProps}
            numberOfLines = {numberOfLines}
            multiline = {true}
            placeholderTextColor = {theme.palette.muted}
            style = {{
                borderWidth: 1,
                borderColor: theme.palette.muted,
                borderRadius: 16,
                textAlignVertical: 'top',
                padding: theme.spacing.medium,
                justifyContent: 'flex-start',
                ...(restProps.style ?? {}) as object
            }}
        />
    )
}

export { TextArea }