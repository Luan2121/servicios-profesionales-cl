import React, { Fragment, useState } from 'react';
import { useTheme } from 'bumbag';
import { StatusBar, View, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';
import { Header } from '@components/header/header';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { Stack } from 'bumbag-native';
import { TextField } from '@components/formik';
import { CalendarPickerField } from '@components/formik/calendar-picker-field/calendar-picker-field';
import { Button, Box } from 'bumbag-native';
import { useAddPayment } from '@hooks/models/use-add-payment';
import { TextareaField } from '@components/formik/textarea-field/textarea-field';
import { LoaderManager } from '@components/loader-manager/loader-manager';

type AddPaymentScreenNavigationProp = StackNavigationProp<
    TechnicianNavigatorParamList,
    'add-payment'
>

type Props = {
    navigation : AddPaymentScreenNavigationProp 
};

const AddPaymentScreen = ({navigation} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { mutate : addPayment, isLoading, data, reset } = useAddPayment();
    const successAddPayment = data?.resp > 0;
    return (
        <Fragment>
            <StatusBar backgroundColor = {theme.palette.secondary} />
            <LoaderManager 
                isLoading = {isLoading}
                success = {{
                    show: data != undefined && successAddPayment,
                    label: 'Operacion exitosa',
                    action: (
                        <Button variant = "outlined" palette = "primary" onPress = {reset} >
                            Volver al inicio
                        </Button>
                    )
                }}
                error = {{
                    show: data != undefined && !successAddPayment,
                    label: 'Error al procesar abono',
                    secondaryLabel: 'Orden de trabajo no encontrada',
                    action: (
                        <Button variant = "outlined" palette = "primary" onPress = {reset}>
                            Reintentar
                        </Button>
                    )
                }}
            > 
                <Header
                    variant = "stack"
                    title = "Nuevo abono"
                    navigation = {navigation}
                />
                <ScrollView style = {{
                    flex: 1,
                    height: '100%'
                }}>
                    <Formik
                        initialValues = {formInitialValues}
                        validationSchema = {formValidation}
                        onSubmit = {(values) => {
                            addPayment({
                                ...values,
                                rut: user?.rut ?? ''
                            });
                        }}
                    >
                        {({ handleSubmit, setFieldValue, values }) => (
                            <View style = {{
                                padding: theme.spacing.large
                            }}>
                                <Stack>
                                    <Box justifyContent = "center">
                                        <Text style = {{
                                            fontSize: 18,
                                            marginBottom: theme.spacing.medium
                                        }}>
                                            Seleccione metodo de pago
                                        </Text>
                                        <View style = {{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginBottom: theme.spacing.medium
                                        }}>
                                            <View style = {{
                                                paddingRight: theme.spacing.medium
                                            }}>
                                                <PaymentMethodButton
                                                    type = "Deposito"
                                                    selected = { values.paymentMethod === "Deposito" }
                                                    onPress = { () => {
                                                        setFieldValue('paymentMethod','Deposito')
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <PaymentMethodButton
                                                    type = "Transferencia"
                                                    selected = { values.paymentMethod === "Transferencia" }
                                                    onPress = { () => {
                                                        setFieldValue('paymentMethod','Transferencia')
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style = {{
                                            flexDirection: 'row',
                                            justifyContent: 'center'
                                        }}>
                                            <View style = {{
                                                paddingRight: theme.spacing.medium
                                            }}>
                                                <PaymentMethodButton
                                                    type = "Credito"
                                                    selected = { values.paymentMethod === "Credito" }
                                                    onPress = { () => {
                                                        setFieldValue('paymentMethod','Credito')
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <PaymentMethodButton
                                                    type = "Debito"
                                                    selected = { values.paymentMethod === "Debito" }
                                                    onPress = { () => {
                                                        setFieldValue('paymentMethod','Debito')
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </Box>
                                    <TextField 
                                        name = "orderId"
                                        label = "ID orden de trabajo"
                                    />
                                    <Box>
                                        <TextField
                                            name = "value"
                                            label = "Monto"
                                        />
                                    </Box>
                                    <TextareaField
                                        name = "description"
                                        placeholder = "Descripcion"
                                    />
                                    <Box marginTop = "large">
                                        <CalendarPickerField
                                            name = "date"
                                            format = ""
                                            showTime = {false}
                                            selectedDayColor={theme.palette.primary}
                                            selectedDayTextColor={theme.palette.body}
                                        />
                                    </Box>
                                    <Box marginTop = "large">
                                        <Button palette = "primary" onPress = {() => {
                                            handleSubmit();
                                        }}>
                                            Guardar
                                        </Button>
                                    </Box>
                                </Stack>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </LoaderManager>
        </Fragment>
    )
}

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

export default AddPaymentScreen;
