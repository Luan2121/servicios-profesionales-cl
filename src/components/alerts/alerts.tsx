import React, { ReactNode } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableWithoutFeedbackProps, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'bumbag';

type Tone = 'danger' | 'warning' | 'success' | 'info' | 'promote'

export type AlertProps = {
    tone: Tone,
    icon?: any,
    children: ReactNode,
    action ?: {
        text: string,
        onPress: TouchableWithoutFeedbackProps['onPress']
    }
}

const backgroundForTone = {
    danger: 'dangerLight',
    warning: 'warningLight',
    promote: 'promoteLight',
    success: 'successLight',
    info: 'infoLight'
} as Record<Tone,string>

const Alert = ( {
    tone,
    icon,
    children,
    action
} : AlertProps ) => {
    const { theme } = useTheme();
    return(
        <View style = {{
            backgroundColor: theme.palette[ backgroundForTone[tone] ],
            padding: theme.spacing.medium,
            flexDirection: 'row',
            borderRadius: 16,
            flexWrap: 'wrap'
        }}>
            {!!icon && (
                <View style = {{
                    marginRight: theme.spacing.medium
                }}>
                    <AntDesign name = {icon} size = {24} color = { theme.palette[tone] } />
                </View>
            )}
            <Text style = {{
                color: theme.palette[tone],
                fontSize: 12,
                flex: 1
            }}>
                {children}
            </Text>
            {!!action && (
                <TouchableWithoutFeedback onPress = {action.onPress}>
                    <Text style = {{
                        color: theme.palette[tone],
                        fontSize: 12,
                        borderBottomColor: theme.palette[tone],
                        borderBottomWidth: 1
                    }}>
                        {action.text}
                    </Text>
                </TouchableWithoutFeedback>
            )}
        </View>
    )
}

export { Alert };