import React from 'react';
import { useTheme } from 'bumbag';
import { View, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, Text } from 'react-native';
import { Box } from 'bumbag-native';

interface PaymentMethodButtonProps extends TouchableWithoutFeedbackProps  {
    type: string,
    selected: boolean
}

const PaymentMethodButton = ({
    type,
    disabled,
    selected,
    ...restProps
} : PaymentMethodButtonProps) => {
    const { theme } = useTheme();
    return (
        <Box>
            <TouchableWithoutFeedback {...restProps}>
                <View style = {{
                    width: 130,
                    height: 130,
                    borderWidth: 1,
                    borderColor: selected 
                        ? theme.palette.primary
                        : theme.palette.muted,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                    backgroundColor: disabled 
                        ? theme.palette.mutedDark 
                        : selected 
                            ? theme.palette.primary
                            : undefined
                }}>
                    <Text style = {{
                        color: selected 
                            ? theme.palette.body
                            : theme.palette.muted
                    }}>
                        {type}
                    </Text>           
                </View>
            </TouchableWithoutFeedback>
        </Box>
    )
};

export { PaymentMethodButton };