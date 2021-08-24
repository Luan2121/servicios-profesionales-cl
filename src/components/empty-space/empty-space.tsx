import React, { Fragment, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'bumbag';

type EmptySpaceProps = {
    show: boolean,
    title: string,
    children: ReactNode
}

const EmptySpace = ({
    title,
    show,
    children
} : EmptySpaceProps ) => {
    const { theme } = useTheme();

    if( !show ){
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }

    return (
        <View style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style = {{
                fontSize: 18,
                color: theme.palette.muted
            }}>
                {title}
            </Text>
        </View>
    )
}

export { EmptySpace };