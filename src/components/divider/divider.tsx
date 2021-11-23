import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'bumbag';

type DividerProps = {
    style?: object
}

const Divider = ({ style } : DividerProps) => {
    const { theme } = useTheme();
    return (
        <View style = {{
            width: '100%',
            height: 1,
            backgroundColor: theme.palette.muted,
            ...(style ?? {})
        }}/>
    )
}

export { Divider };