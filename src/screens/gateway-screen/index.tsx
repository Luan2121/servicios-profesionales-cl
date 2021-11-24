import React , { Fragment, useEffect, useRef, useState } from  'react';
import { Dimensions, View, StatusBar, Text, SafeAreaView } from 'react-native';
import { Box, Stack, Button } from 'bumbag-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientNavigatorStack } from '@navigators/client-navigator/client-navigator';
import { useVerifyOrderStatus } from '@hooks/use-webpay';
import { LoaderManager } from '@components/loader-manager/loader-manager';
import { useCreateWorkOrder } from '@hooks/models/user-work-order';
import { useTheme } from "bumbag";
import dayjs from 'dayjs';

type GatewayScreenNavigationProp = StackNavigationProp<
    ClientNavigatorStack,
    'gateway-screen'
>

type GatewayScreenRouteProp = RouteProp<
    ClientNavigatorStack,
    'gateway-screen'
>

type Props = {
    navigation : GatewayScreenNavigationProp,
    route : GatewayScreenRouteProp 
}

const GatewayScreen = ({
    route,
    navigation
} : Props) => { 
    const { webpay, order } = route.params;
    const webview = useRef(null);
    const canShowWbpay = webpay.token && webpay.url;
    const { theme } = useTheme();
    const [ orderPaid, setOrderPaid ] = useState(false);
    const { mutate : verifyStatus, isLoading : isVerifyingStatus , data } = useVerifyOrderStatus();
    const { mutate : createWorkOrder, isLoading : isCreatingOrder } = useCreateWorkOrder();

    useEffect( () => {
        if( orderPaid ){
            verifyStatus({ token: webpay.token });
        }
    } , [orderPaid,verifyStatus]);

    useEffect( () => {
        let result = data;
        if(result){
            const date = dayjs(order.date);
            switch(result.status){
                case "AUTHORIZED": 
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
                break;

                default:
                break;

            }
        }   
    } , [data]);


    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView style = {{ flex: 1 }}>
                <LoaderManager isLoading = { isVerifyingStatus || isCreatingOrder }>
                    <View style = {{
                        flex: 1,
                        height: '100%',
                        width: '100%'
                    }}>
                        { ( canShowWbpay && !orderPaid ) && (
                            <WebView
                                ref = {webview}
                                style = {{
                                    height: Dimensions.get('screen').height,
                                    width: Dimensions.get('screen').width
                                }}
                                originWhitelist={['*']}
                                javaScriptEnabled = {true}
                                javaScriptCanOpenWindowsAutomatically = {true}
                                source={{ html: createFormTemplate(webpay.token,webpay.url) }}
                                onNavigationStateChange = {(newState) => {
                                    if(newState.title === "Transbank SDK Nodejs"){
                                        setOrderPaid(true);
                                    }
                                }}
                            />
                        )}
                        {( orderPaid && !isVerifyingStatus && !isCreatingOrder ) && (
                            <View style = {{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Stack>
                                        <Box>

                                        </Box>
                                        <Box>
                                            <Text style = {{
                                                textAlign: 'center',
                                                fontSize: 24,
                                                fontWeight: 'bold'
                                            }}>
                                                Tu orden ha sido creada
                                            </Text>
                                            <Text style = {{
                                                textAlign: 'center',
                                                color: theme.palette.muted
                                            }}>
                                                Nos estaremos contactando con usted
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Button palette = "primary" onPress = { () => {
                                                navigation.navigate("tabs");
                                            }}>
                                                Volver al inicio
                                            </Button>
                                        </Box>
                                    </Stack>
                                </View>
                            </View>
                        )}
                    </View>
                </LoaderManager>
            </SafeAreaView>
        </Fragment>
    )
}

const createFormTemplate = (token,url) => `
    <style>
        body {
            margin: 0;
        }

        .container {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .pay-button {
            padding: 32px 54px;
            width: 60%;
            font-size: 48px; 
            background-color: #000199;
            color: #FFFFFF;
            border-radius: 24px;
        }

        .form {
            width: 100%;
            text-align: center;
            color: #FFFFFF;
        }

    </style>
    <div class = "container">
        <form class = "form" action="${url}" method="POST">
            <input type="hidden" name="token_ws" value="${token}"/>
            <input class="pay-button" type="submit" value="Continuar a weppay"/>
        </form>
    </div>
`

export default GatewayScreen;
