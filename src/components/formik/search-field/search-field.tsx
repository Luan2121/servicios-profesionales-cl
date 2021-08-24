import { useField } from 'formik';
import React from 'react';

import { Search, SearchProps } from '../../search/search';

interface Props extends SearchProps {
    name: string
}

const SearchField = ({ name , ...restProps} : Props) => {
    const [ _ , meta, helpers ] = useField(name);
    
    return (
        <Search
            value = {meta.value}
            onChangeText = {(text) => {
                helpers.setValue(text);
            }}
            {...restProps}
        />
    )
}

export { SearchField };