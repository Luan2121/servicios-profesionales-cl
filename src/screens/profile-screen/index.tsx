import React, { Fragment } from 'react';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, StatusBar, View, Image, TouchableOpacity } from 'react-native';
import { Box, Stack, Button, Text } from 'bumbag-native';
import { TextField, SelectField, PhoneField } from '@components/formik';
import { useTheme } from 'bumbag';
import { Assets } from '@assets';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth, useAsync } from '@hooks';
import { LoaderManager } from '@components/loader-manager/loader-manager';


type SignUpScreenNavigationProp = StackNavigationProp<
    AuthNavigatorParamList,
    'sign-up-screen'
>

type Props = {
    navigation: SignUpScreenNavigationProp
}


const SignUpScreen = ({ navigation } : Props ) => {
    const { theme } = useTheme();
    const auth = useAuth();
    const {isLoading, isError, error, run} = useAsync();
    return (
        <Fragment>
            <StatusBar backgroundColor={theme.palette.secondary} />
            <LoaderManager isLoading = {isLoading} >
                <Formik
                    initialValues = {formInitialValues(auth.user)}
                    validationSchema = {formValidation}
                    onSubmit = {(values) => {
                        run( auth.register(values) );
                    }}
                >
                    {({ handleSubmit, isValid, values }) => (
                        <Box style = {{
                            flex: 1,
                            backgroundColor: theme.palette.secondary
                        }}>
                            <ImageBackground 
                                source = {Assets.images.bg1} 
                                style = {{ width: '100%' , height: '100%', justifyContent: 'flex-end' }}
                                resizeMode="cover" 
                            >
                                <View>
                                    <Image
                                        style = {{
                                            alignSelf: 'center',
                                            marginVertical: theme.spacing.medium
                                        }}
                                        source = {Assets.images.fullLogo}
                                        width = {120}
                                        height = {30}
                                    />
                                </View>
                                <ScrollView style = {{
                                    flex: 1
                                }}>
                                    <View style = {{
                                        height: '90%',
                                        backgroundColor: theme.palette.body,
                                        borderTopEndRadius: 16,
                                        borderTopStartRadius: 16,
                                        padding: theme.spacing.xxlarge,
                                        justifyContent: 'space-between',
                                        flex: 1
                                    }}>
                                        <View style = {{
                                            marginBottom: theme.spacing.large
                                        }}>
                                            <Text>
                                                Antes de continuar debes completar la información
                                                de tu perfil.
                                            </Text>
                                        </View>
                                        <Stack spacing="xlarge">
                                            <TextField name = "user" size = "medium" placeholder = "Usuario"  />
                                            <TextField disabled = {true}  name = "email" size = "medium" placeholder = "Email" />
                                            <TextField name = "rut" size = "medium" placeholder = "Rut"/>
                                            <PhoneField 
                                                name = "phone"
                                                size = "medium"
                                                placeholder = "Telefono"
                                            />
                                            <TextField name = "giro" size = "medium" placeholder = "Giro" />
                                            <SelectField 
                                                name= "city" 
                                                size = "medium" 
                                                placeholder = "Ciudad" 
                                                screen = "select-city-screen"
                                            />
                                            <View style = {{ 
                                                marginTop: 28
                                            }}>
                                                <SelectField 
                                                    name= "comuna" 
                                                    size = "medium" 
                                                    placeholder = "Comuna" 
                                                    screen = "select-comuna-screen"
                                                    params = {{
                                                        cityId: values.city?.id
                                                    }}
                                                    {...( !values.city?.id ? {
                                                        disabled: undefined
                                                    } : {})}
                                                />
                                            </View>
                                        </Stack>
                                        <View style = {{
                                            marginTop: 36
                                        }}> 
                                            <Stack spacing = "xlarge">
                                                <Button palette = "secondary" disabled={!isValid} onPress = {() => {
                                                    handleSubmit();
                                                }}>
                                                    <Button.Text color = {theme.palette.body}>
                                                        Ingresa
                                                    </Button.Text>
                                                </Button>
                                            </Stack>
                                        </View>
                                        <View  style = {{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginTop: theme.spacing.large
                                        }}>
                                            <TouchableOpacity 
                                                onPress = {() => {
                                                    auth.logout()
                                                }}
                                                activeOpacity={0.8} 
                                                style = {{
                                                    marginLeft: theme.spacing.small
                                                }}
                                            >
                                                <Text color="secondary"> 
                                                    Salir
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </ImageBackground>
                        </Box>
                    )}
                </Formik>
            </LoaderManager>
        </Fragment>
    )
}

export default SignUpScreen;