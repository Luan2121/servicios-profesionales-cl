import React, { Fragment } from 'react';
import { StatusBar, View, Text, FlatList } from 'react-native';
import { Header } from '@components/header/header';
import { OrderNavigatorParamList } from "@navigators/orders-navigator/orders-navigator";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useOrderDetail } from '@hooks/models/use-orders';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'bumbag';
import { Pill , PillText } from '@components/pill/pill';
import { Divider } from '@components/divider/divider';
import { HistoryItem, OrderDetail as TOrderDetail, Tone } from '@types';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAuth } from '@hooks/use-auth';
import { UploadButton } from '@components/upload-button/upload-button';
import { Button } from 'bumbag-native';
import { LoaderManager } from '@components/loader-manager/loader-manager';
import { useStorePhoto } from '@hooks/use-photos';

type OrderDetailScreenNavigationProp = StackNavigationProp<
    OrderNavigatorParamList,
    'order-detail'
>

type OrderDetailScreenRouteProp = RouteProp<
    OrderNavigatorParamList,
    'order-detail'
>

type Props = {
    navigation : OrderDetailScreenNavigationProp,
    route: OrderDetailScreenRouteProp
};

const IconProviders = {
    Feather,
    AntDesign,
    MaterialCommunityIcons
}

const toneForStatusMap = {
    'Completado': 'success',
    'En proceso': 'warning'
} as Record<TOrderDetail['status'],Tone>

const OrderDetail = ({
    navigation,
    route
} : Props) => {
    const { order } = route.params;
    const { mutate : storePhoto, isLoading : isStoringPhoto } = useStorePhoto();
    const { data : orderDetail , isLoading : isLoadingOrderDetails } = useOrderDetail({ id: order.id });
    const { user } = useAuth();
    const { theme } = useTheme();
    return (
        <Fragment>
            <StatusBar/>
            <Header
                title = {`Orden: ${order.id}`}
                variant = "stack"
                navigation = {navigation}
            />
            <LoaderManager isLoading = {isLoadingOrderDetails || !orderDetail} variant = {'cover'}>
                <ScrollView style = {{
                    flex: 1,
                    marginBottom: theme.spacing.large
                }}>
                    <View style = {{
                        padding: theme.spacing.large,
                    }}>
                        <View style = {{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style = {{
                                color: theme.palette.secondary,
                                fontWeight: '300'
                            }}>
                                Presupuesto: { orderDetail?.budget || "No tiene" }
                            </Text>
                            <Pill tone = {toneForStatusMap[orderDetail?.status || 'warning']}>
                                <PillText>
                                    Estatus: {orderDetail?.status || ""}
                                </PillText>
                            </Pill>
                        </View>
                        <View style = {{
                            marginTop: theme.spacing.large
                        }}>
                            <Text style = {{ fontSize: 18 }}>
                                Descripcion
                            </Text>
                            <Text style = {{ marginTop: theme.spacing.medium, color: theme.palette.muted }} >
                                {orderDetail?.description}
                            </Text>
                            <Divider style = {{ marginTop: theme.spacing.large }} />
                        </View>
                        { !!orderDetail?.address && (
                            <OrderSummaryItem
                                content = {orderDetail.address}
                                icon = {<Feather name="map-pin" size={14} color={theme.palette.muted} />}
                                title = {`Cliente: ${orderDetail.client}`}
                                style = {{
                                    marginTop: theme.spacing.large
                                }}
                            />
                        )}
                        { !!orderDetail?.service && (
                            <OrderSummaryItem
                                title = "Tipo de servicio"
                                icon = {<Feather name="map-pin" size={14} color={theme.palette.muted} />}
                                content = {`${orderDetail.service} | ${orderDetail.specialty}`}
                                style = {{
                                    marginTop: theme.spacing.large
                                }}
                            />
                        )}
                        { !!orderDetail?.technicianId && (
                            <OrderSummaryItem
                                title = {`Tecnico ${orderDetail.technicianId}`}
                                icon = {<Feather name="map-pin" size={14} color={theme.palette.muted} />}
                                content = "John Doe"
                                style = {{
                                    marginTop: theme.spacing.large
                                }}
                            />
                        )}
                        {/*<OrderSummaryItem
                            title = "Metodo de pago"
                            icon = {<Feather name="map-pin" size={14} color={theme.palette.muted} />}
                            content = "Online, Orden #3697"
                            style = {{
                                marginTop: theme.spacing.large
                            }}
                        />*/}
                        {!!orderDetail?.history.length && (
                            <Fragment>
                                <View style = {{
                                    marginTop: theme.spacing.large
                                }}>
                                    <Text style = {{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: theme.palette.primary,
                                        fontSize: 18
                                    }}>
                                        Seguimiento
                                    </Text>
                                </View>
                                <FlatList 
                                    contentContainerStyle = {{
                                        marginTop: theme.spacing.large
                                    }}
                                    data = {orderDetail?.history || []}
                                    renderItem = { ({ item, index }) => (
                                        <HistoryStep item = {item} showBar = {index < ( orderDetail?.history || [] ).length - 1 } /> 
                                    )}
                                />
                            </Fragment>
                        )}
                    </View>
                    <View style = {{
                        marginTop: theme.spacing.large
                    }}>
                        {user?.type === "technician" && (
                            <UploadButton isLoading = {isLoadingOrderDetails} onUpload = {(image) => {
                                storePhoto({
                                    orderId: order.id,
                                    technicianId: user?.rut || "",
                                    photo: image
                                });
                            }}/>
                        )}
                    </View>
                    {user?.type === 'technician' && (
                        <View style = {{
                            padding: theme.spacing.medium
                        }}>
                            <Button palette = "primary" onPress = {() => {
                                navigation.navigate("mutate-report-screen", { 
                                    order
                                });
                            }}>
                                Agregar reporte
                            </Button>
                        </View>
                    )}
                </ScrollView>
            </LoaderManager>
        </Fragment>
    )
};

type HistoryStepProp = {
    item: HistoryItem,
    showBar: boolean
};

const HistoryStep = ({ item, showBar } : HistoryStepProp ) => {
    const Icon = IconProviders[item.actionIcon.provider];
    const { theme } = useTheme();
    return (
        <View style = {{
            flexDirection: 'row',
            minHeight: 75
        }}>
            <View style = {{
                alignItems: 'center',
                paddingHorizontal: theme.spacing.large
            }}>
                <View>
                    <Icon name = {item.actionIcon.icon} size = {22} color = {theme.palette.primary} /> 
                </View>
                {showBar && (
                    <View style = {{
                        height: 75,
                        borderLeftWidth: 1,
                        borderLeftColor: theme.palette.primary,
                        borderStyle: 'dashed',
                        marginVertical: theme.spacing.small
                    }}/>
                )}
            </View>
            <View>
                <Text style = {{
                    marginBottom: theme.spacing.small,
                    fontSize: 18
                }}>
                    { item.actionType === "Default" ? "Informacion" : item.actionType }
                </Text>
                <Text style = {{
                    marginBottom: theme.spacing.small,
                    color: theme.palette.muted,
                    fontSize: 14
                }}>
                    { item.action }
                </Text>
                {!!item.date && (
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <View>
                            <Feather name="clock" size={14} color={theme.palette.secondary} />
                        </View>
                        <Text style = {{ 
                            color: theme.palette.muted,
                            fontSize: 14
                        }}>
                            {item.date}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const OrderSummaryItem = ({ icon, title, content, style }) => {
    const { theme } = useTheme();
    return(
        <View style = {style} >
            <View style = {{ flexDirection: 'row', alignItems: 'flex-start'}}>
                {icon && (
                    <View style = {{
                        padding: theme.spacing.small,
                        borderColor: theme.palette.muted,
                        borderRadius: 8,
                        borderWidth: 1,
                        marginRight: theme.spacing.medium,
                    }}>
                        {icon}
                    </View>
                )}
                <View>
                    <Text style = {{ fontSize: 18 }}>
                        { title }
                    </Text>
                    {typeof content === "string" 
                        ? (
                            <Text style = {{ marginTop: theme.spacing.medium, color: theme.palette.muted }} >
                                {content}
                            </Text>
                        ) : { content }
                    }
                </View>
            </View>
            <Divider style = {{ marginTop: theme.spacing.large }} />
        </View>
    );
}
export default OrderDetail;