import { TextArea, TextAreaProps } from '@components/textarea/textarea';
import { useField } from 'formik';
import React from 'react';

interface TextAreaFieldProps extends TextAreaProps {
    name: string
}

const TextareaField = ({
    name,
    placeholder
} : TextAreaFieldProps ) => {
    const [ field, meta, helpers ] = useField(name);
    return (
        <TextArea
            placeholder = {placeholder}
            value = {meta.value}
            onChangeText = {(text) => {
                helpers.setValue(text);
            }}
        />
    );
}

export { TextareaField };