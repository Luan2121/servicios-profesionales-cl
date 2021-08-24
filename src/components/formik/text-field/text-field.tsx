import React from 'react';
import { FieldWrapper, Input, InputProps, FieldWrapperProps } from 'bumbag-native';
import { useField } from 'formik';

interface Props extends Pick<InputProps,'placeholder' | 'size' | 'secureTextEntry' > , FieldWrapperProps {
    name : string
}

const TextField = ({
    placeholder,
    name,
    size,
    secureTextEntry,
    ...wrapperProps
} : Props) => {
    const [ _ , meta, helpers ] = useField(name);
    const isError = meta.error && meta.touched;
    const state = isError ? "danger" : undefined;
    const validationText = isError ? meta.error : "";
    return (
        <FieldWrapper {...wrapperProps} state={state}>
            <Input size = {size} placeholder = {placeholder} value = {meta.value}
                secureTextEntry = {secureTextEntry}
                onBlur = {() => {
                    helpers.setTouched(true);
                }} 
                onChangeText = {(value) => {
                    helpers.setValue(value);
                }}
            />
        </FieldWrapper>
    );
}

export { TextField };