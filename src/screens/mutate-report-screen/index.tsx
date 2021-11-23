import React, { Fragment } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Header } from '@components/header/header';
import { OrderNavigatorParamList } from "@navigators/orders-navigator/orders-navigator";
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'bumbag';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { useMutateReport } from '@hooks/models';
import { useAuth } from '@hooks/use-auth';
import { Stack, Box, Switch, Button } from 'bumbag-native';
import { TextField } from '@components/formik';
import { RouteProp } from '@react-navigation/native';
import { PaymentMethodButton } from '@components/payment-method-button/payment-method-button';
import { TextareaField } from '@components/formik/textarea-field/textarea-field';
import { CalendarPickerField } from '@components/formik/calendar-picker-field/calendar-picker-field';
import { LoaderManager } from '@components/loader-manager/loader-manager';

type MutateReportScreenNavigationProp = StackNavigationProp<
    OrderNavigatorParamList,
    'mutate-report-screen'
>

type MutateReportScreenRouteProp = RouteProp<
    OrderNavigatorParamList,
    'mutate-report-screen'
>

type Props = {
    navigation : MutateReportScreenNavigationProp,
    route : MutateReportScreenRouteProp
};

const MutateReportScreen = ({
    navigation,
    route
} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { order } = route.params;
    const { mutate : addReport, isLoading } = useMutateReport();
    return (
        <LoaderManager isLoading = {isLoading} >
            <StatusBar/>
            <Header
                title = "Reporte de valores"
                variant = "stack"
                navigation = {navigation}
            />
            <ScrollView style = {{
                flex: 1,
                marginBottom: theme.spacing.large
            }}>
                <Formik initialValues = {formInitialValues}
                    validationSchema = {formValidation}
                    onSubmit = {(values) => {
                        addReport({
                            ...values, 
                            userRut: user?.rut || "",
                            orderId: order.id
                        });
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => {
                        return (
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
                                    <Box marginTop = "large">
                                        <Switch 
                                            align="left" 
                                            label="Deja magnetico" 
                                            palette="primary"
                                            checked={values.hasMagnetic}
                                            onChange={(e) => {
                                                setFieldValue('hasMagnetic',!values.hasMagnetic);
                                            }}
                                        />
                                    </Box>
                                    <TextField
                                        name = "valueWithIva"
                                        keyboardType = "numeric"
                                        label = "Valor con IVA"
                                    />
                                    <TextareaField 
                                        name = "description"
                                        placeholder = "Descripcion"
                                    />
                                    <Box marginTop = "large">
                                        <Switch 
                                            label="¿Tiene factura de gastos?" 
                                            align="left" 
                                            palette="primary"
                                            checked={values.hasBilling}
                                            onChange={(e) => {
                                                setFieldValue('hasBilling',!values.hasBilling);
                                            }}
                                        />
                                    </Box>
                                    {values.hasBilling && (
                                        <Stack>
                                            <Box marginBottom = "large">
                                                <CalendarPickerField 
                                                    name = "bill.date"
                                                />
                                            </Box>
                                            <TextField 
                                                label = "RUT"
                                                name = "bill.rut"
                                            />
                                            <TextField
                                                label = "Numero de factura"
                                                name = "bill.number"
                                            />
                                            <TextField 
                                                label = "Valor"
                                                name = "bill.value"
                                            />
                                        </Stack>
                                    )}
                                    <Button palette = "primary" onPress = {() => {
                                        handleSubmit();
                                    }}>
                                        Agregar reporte
                                    </Button>
                                </Stack>
                            </View>
                        );
                    }}
                </Formik>
            </ScrollView>
        </LoaderManager>
    )
};

export default MutateReportScreen;