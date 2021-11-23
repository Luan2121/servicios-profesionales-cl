import { useTheme } from 'bumbag';
import React, { createContext, useContext } from 'react';
import { View, Text } from 'react-native';

type PillProps = {
    children: React.ReactNode,
    tone: 'success' | 'warning' | 'danger'
};

type TPillContext = {
    textColor: string
};

const PillContext = createContext<TPillContext | null>(null);

const Pill = ({ children, tone } : PillProps) => {
    const { theme } = useTheme();
    return (
        <PillContext.Provider value = {{
            textColor: theme.palette[`${tone}`]
        }}>
            <View style = {{
                paddingVertical: theme.spacing.small,
                paddingHorizontal: theme.spacing.large,
                borderRadius: 14,
                backgroundColor: theme.palette[`${tone}Light`]
            }}>
                {children}
            </View>
        </PillContext.Provider>
    )
}

const PillText = ({ children }) => {
    const context = useContext(PillContext);
    return (
        <Text style = {{
            color: context?.textColor
        }}>
            {children}
        </Text>
    );
}

Pill.Text = PillText;

export { Pill, PillText };