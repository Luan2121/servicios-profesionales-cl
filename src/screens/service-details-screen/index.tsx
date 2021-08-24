import React, { Fragment } from 'react';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from 'bumbag';
import { View, StatusBar, Text, Image, ScrollView } from 'react-native';
import { Box, Menu, Set, Stack, Button } from 'bumbag-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClientNavigatorStack } from '@navigators/client-navigator/client-navigator';
import { Header } from '@components/header/header';
import { Alert } from '@components/alerts/alerts';
import { AddressCard } from '@components/address-card/address-card';
import { useServicePrice } from '@hooks/models/use-service';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { SelectField } from '@components/formik';
import { TextareaField } from '@components/formik/textarea-field/textarea-field';
import { CalendarPickerField } from '@components/formik/calendar-picker-field/calendar-picker-field';
import { useDirections } from '@hooks/models/use-directions';
import { useAuth } from '@hooks/use-auth';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PreOrder } from '@types';

type ServiceDetailScreenNavigationProp = StackNavigationProp<
    ClientNavigatorStack,
    'service-details'
>

type ServiceDetailRouteProp = RouteProp<
    ClientNavigatorStack,
    'service-details'
>

type Props = {
    navigation : ServiceDetailScreenNavigationProp,
    route : ServiceDetailRouteProp 
}


const ServiceDetailScreen = ({
    navigation,
    route : { params : { service } }
} : Props ) => {
    const { theme } = useTheme();
    const { data : price } = useServicePrice(service.id);
    const { user } = useAuth();
    const { data : directions , isLoading : isLoadingDirections } = useDirections( user );
    return (        
        <Fragment>
            <StatusBar backgroundColor = {theme.palette.body} barStyle = 'dark-content' />
            <Header
                variant = "stack"
                navigation = {navigation}
            />
            <Formik 
                initialValues = {formInitialValues}
                onSubmit = {(values) => {
                    navigation.navigate("checkout-screen", {
                        order: {
                            ...({
                                ...values,
                                service,
                                value: price ?? 1530
                            }) as PreOrder
                        }
                    })
                }}
            >
                {({ 
                    handleSubmit, 
                    setFieldValue, 
                    values, 
                    errors,
                    isValid 
                }) => {
                    console.log({errors});
                    return (
                        <View style = {{ flex: 1 }}>
                            <View style = {{
                                alignItems: 'flex-end',
                                marginTop: -100,
                                marginBottom: -16
                            }}>
                                <View style = {{
                                    alignItems: 'flex-end',
                                    backgroundColor: theme.palette.secondary,
                                    height: 250,
                                    width: '90%',
                                    borderTopStartRadius: 250
                                }}>
                                    { service.image && (
                                        <Image
                                            source = {service.image}
                                            resizeMode = 'cover'
                                            style = {{
                                                height: 250,
                                                width: '90%'
                                            }}
                                        />
                                    )}
                                </View>
                            </View>   
                            <ScrollView style ={{
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                backgroundColor: theme.palette.body
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
                                            fontSize: 32,
                                            fontWeight: 'bold',
                                            color: theme.palette.primary
                                        }}>
                                            {service.name}
                                        </Text>
                                        <Text style = {{
                                            color: theme.palette.muted
                                        }}>
                                            ${price}
                                        </Text>
                                    </View>
                                    <Text style = {{
                                        marginTop: theme.spacing.medium,
                                        marginBottom: theme.spacing.medium,
                                        color: theme.palette.muted,                    
                                        fontSize: 12,
                                    }}>
                                        Recibe inspecciones perzonalidas  
                                        para conocer el estado de tus tuberias 
                                        con los mejores equipos del mercado, 
                                        descrubre si tienes ductos rotos o fugas 
                                        con nuestro servicio de ductopia
                                    </Text>
                                    <Alert tone = "warning" icon = "warning">
                                        El valor final solo considerará 
                                        la mano de obra, no los instrumentos y 
                                        materiales necesarios.
                                    </Alert>
                                    <Box>
                                        <Text style = {{
                                            color: theme.palette.primary,
                                            fontSize: 18,
                                            padding: theme.spacing.small
                                        }}>
                                            Agendar Cita
                                        </Text>
                                    </Box>
                                    <Stack spacing="medium" >
                                        <Menu backgroundColor="body">
                                            <SelectField.MenuItem
                                                label = "Tipo de servicio"
                                                screen = "select-service-screen"
                                                name = "subService"
                                                params = {{
                                                    service
                                                }}
                                            />
                                            <SelectField.MenuItem
                                                label = "Comuna"
                                                screen = "select-comuna-screen"
                                                name = "comuna"
                                            />
                                            <SelectField.MenuItem
                                                label = "Modalidad del servicio"
                                                screen = "select-modality-screen"
                                                name = "modality"
                                            />
                                        </Menu>
                                        <Box>
                                            <TextareaField 
                                                name = "description" 
                                                placeholder = "Descripcion" 
                                            />
                                        </Box>
                                        <Box padding="medium" >
                                            <CalendarPickerField
                                                selectedDayColor={theme.palette.primary}
                                                selectedDayTextColor={theme.palette.body}
                                                name = "date"
                                                format = {null}
                                            />
                                        </Box>
                                        <Box>
                                            <View style = {{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: theme.spacing.small
                                            }}>
                                                <Text style = {{
                                                    color: theme.palette.primary,
                                                    fontSize: 18,
                                                    padding: theme.spacing.small,
                                                    fontWeight: 'bold'
                                                }}>
                                                    Dirección
                                                </Text>
                                                <TouchableWithoutFeedback onPress = {() => {
                                                    navigation.navigate('tabs', {
                                                        screen: 'account',
                                                        params: {
                                                            screen: 'mutate-direction-screen'
                                                        }
                                                    });
                                                }}>
                                                    <Text style = {{
                                                        color: theme.palette.muted
                                                    }}>
                                                        agregar
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View>
                                                {!directions?.length && !isLoadingDirections 
                                                    ? <AddressCard.Add />
                                                    : <FlatList 
                                                        horizontal
                                                        data = {directions}
                                                        renderItem = {({ item }) => (
                                                            <View style = {{
                                                                marginRight: theme.spacing.medium,
                                                                borderRadius: 16,
                                                                overflow: 'hidden'
                                                            }}>
                                                                <AddressCard 
                                                                    item = {item} 
                                                                    selected = { item.id === values.direction?.id }
                                                                    onPress = {(direction) => {
                                                                        setFieldValue('direction',direction);
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                    />
                                                }
                                            </View>
                                            <View style = {{
                                                marginTop: theme.spacing.medium
                                            }}>
                                                <Set width = "100%">
                                                    <Button width = "50%" variant = "ghost" onPress = {() => { navigation.navigate("tabs") }} >
                                                        Cancelar
                                                    </Button>
                                                    <Button disabled = {!isValid} width = "45%" palette = "primary" onPress = { () => {
                                                        handleSubmit();
                                                    }}>
                                                        Continuar
                                                    </Button>
                                                </Set>
                                            </View>
                                        </Box>
                                    </Stack>
                                </View>
                            </ScrollView>
                        </View>
                    )
                }}
            </Formik>
        </Fragment>
    );
}

export default ServiceDetailScreen;