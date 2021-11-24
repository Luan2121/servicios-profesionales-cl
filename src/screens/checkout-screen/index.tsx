import React, { Fragment, ReactNode } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientNavigatorStack } from '@navigators/client-navigator/client-navigator';
import { StatusBar, View, Text, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, SafeAreaView } from 'react-native';
import { Header } from '@components/header/header';
import { ScrollView } from 'react-native-gesture-handler';
import { Stack, Box, Set, Button } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { useAuth } from '@hooks/use-auth';
import { v4 as uuid } from 'uuid';
import { useWebPay } from '@hooks/use-webpay';
import { Assets } from '@assets';
import { useCreateWorkOrder } from '@hooks/models/user-work-order';
import dayjs from 'dayjs';
import { LoaderManager } from '@components/loader-manager/loader-manager';

const ManualPaymentIcon = Assets.icons.manualPayment;
const OnlinePaymentIcon = Assets.icons.onlinePaymentIcon;

type CheckoutScreenNavigationProp = StackNavigationProp<
    ClientNavigatorStack,
    'checkout-screen'
>

type CheckoutScreenRouteProp = RouteProp<
    ClientNavigatorStack,
    'checkout-screen'
>

type Props = {
    navigation : CheckoutScreenNavigationProp,
    route : CheckoutScreenRouteProp 
}

const CheckoutScreen = ({
    navigation,
    route
} : Props) => {
    const { order } = route.params;
    const { user } = useAuth();
    const { theme } = useTheme();
    const { mutate : createWorkOrder, isLoading : isCreatingOrder, data : successOrder, reset } = useCreateWorkOrder();
    const { isLoading : isLoadingWebpay, data } = useWebPay({
        sessionId: `S-${user?.rut}`,
        orderId: `O-${uuid().substr(0,5)}`,
        amount: 1530
    })
    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView>
                <Header 
                    title = "Tu orden"
                    variant = "stack"
                    navigation = {navigation}
                />
                <LoaderManager 
                    isLoading = {isCreatingOrder} 
                    success = {{
                        show: successOrder != undefined,
                        label: 'Operacion exitosa',
                        secondaryLabel: 'Nos estaremos contactando con usted',
                        action: (
                            <Button variant = "outlined" palette = "primary" onPress = {() => {
                                navigation.navigate("tabs");
                                reset();
                            }} >
                                Volver al inicio
                            </Button>
                        )
                    }}
                >

                    <ScrollView style = {{
                        flex: 1
                    }}>
                        <View style = {{
                            padding: theme.spacing.large
                        }}>
                            <View style = {{
                                padding: theme.spacing.large,
                                borderRadius: 16,
                                backgroundColor: '#E5E5E5'
                            }}>
                                <Stack>
                                    <Box>
                                        <Text style = {{
                                            fontSize: 12,
                                            color: theme.palette.muted
                                        }}>
                                            <Text style = {{ fontSize: 12, fontWeight: 'bold' }} >Tipo de servicio:</Text> 
                                            { order.service?.name } | { order.subService?.name }
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text style = {{
                                            fontSize: 12,
                                            color: theme.palette.muted
                                        }}>
                                            <Text style = {{ fontSize: 12, fontWeight: 'bold' }}>Direccion:</Text> { order.direction?.address }
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text style = {{
                                            fontSize: 12,
                                            color: theme.palette.muted
                                        }}>
                                            <Text style = {{ fontSize: 12, fontWeight: 'bold' }}>Fecha:</Text> {order.date}
                                        </Text>
                                    </Box>
                                </Stack>
                            </View>
                            <View style = {{
                                marginTop: theme.spacing.large
                            }}>
                                <Text style = {{
                                    color: theme.palette.primary,
                                    fontWeight: 'bold'
                                }}>
                                    Seleccione metodo de pago
                                </Text>
                            </View>
                            <View style = {{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: theme.spacing.large
                            }}>
                                <Set spacing = "large">
                                    <Box>
                                        <PaymentMethodButton
                                            icon = {<OnlinePaymentIcon width = {36} height = {36}  style = {{
                                                width: 36,
                                                height: 36
                                            }} />}
                                            disabled = {isLoadingWebpay}
                                            onPress = {() => {
                                                navigation.navigate("gateway-screen", {
                                                    order: order,
                                                    webpay: data
                                                });
                                            }}
                                            type = "en linea"
                                        />
                                    </Box>
                                    <Box>
                                        <PaymentMethodButton
                                            icon = {<ManualPaymentIcon style = {{
                                                width: 36,
                                                height: 36
                                            }} />}
                                            onPress = {() => {
                                                const date = dayjs(order.date);
                                                createWorkOrder({
                                                    date: date.toISOString(),
                                                    hour: date.format("HH:mm A"),
                                                    description: order.description,
                                                    comuna: order.comuna,
                                                    service: order.service,
                                                    subService: order.subService,
                                                    modality: order.modality,
                                                    value: order.value
                                                });
                                            }}
                                            type = "manual"
                                        />
                                    </Box>
                                </Set>
                            </View>
                        </View>
                    </ScrollView>
                </LoaderManager>
            </SafeAreaView>
        </Fragment>
    );
};

interface PaymentMethodButtonProps extends TouchableWithoutFeedbackProps  {
    type: string,
    icon: ReactNode
}

const PaymentMethodButton = ({
    type,
    disabled,
    icon,
    ...restProps
} : PaymentMethodButtonProps) => {
    const { theme } = useTheme();
    return (
        <TouchableWithoutFeedback {...restProps}>
            <View style = {{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: theme.palette.muted,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                backgroundColor: disabled ? theme.palette.mutedDark : undefined
            }}>
                <View style ={{
                    width: 36,
                    height: 36
                }}>
                    {icon}
                </View>
                <Text style = {{
                    color: theme.palette.muted
                }}>
                    {type}
                </Text>           
            </View>
        </TouchableWithoutFeedback>
    )
};


export default CheckoutScreen;