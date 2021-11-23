import React, { Fragment, useEffect } from 'react';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, StatusBar, View, Image, TouchableOpacity, Alert as RAlert } from 'react-native';
import { Box, Stack, Button, Text } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { Assets } from '@assets';
import { useAsync, useAuth } from '@hooks';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { LoaderManager } from '@components/loader-manager/loader-manager';
import { TextField } from '@components/formik';
import { useAtom } from 'jotai';
import { userTypeAtom } from '@screens/launch-screen';

type LoginScreenNavigationProp = StackNavigationProp<
    AuthNavigatorParamList,
    'login-screen'
>

type Props = {
    navigation: LoginScreenNavigationProp
}

const LoginScreen = ({ navigation } : Props ) => {
    const { theme } = useTheme();
    const auth = useAuth();
    const [ userType ] = useAtom( userTypeAtom );
    const { isLoading, run, isError, reset } = useAsync();

    useEffect( () => {
        if(isError){
            RAlert.alert(
                "Error",
                "Usuario o clave invalida",
                [{
                    text: "Reintentar",
                    onPress: () => reset()
                }]
            );
        }
    } , [isError]);

    return (
        <Fragment>
            <StatusBar backgroundColor={theme.palette.secondary} />
            <Formik
                initialValues = { formInitialValues }
                validationSchema = { formValidation }
                onSubmit = {(values) => {
                    run( auth.loginWithEmail({...values,userType}) );
                }}
            >
                {({ handleSubmit, isValid }) => (
                    <LoaderManager isLoading = {isLoading}>
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
                                <View style = {{
                                    height: '90%',
                                    backgroundColor: theme.palette.body,
                                    borderTopEndRadius: 16,
                                    borderTopStartRadius: 16,
                                    padding: theme.spacing.xxlarge,
                                    justifyContent: 'space-between'
                                }}>
                                    <Stack spacing="xlarge">
                                        <TextField name = "email" size = "medium" placeholder = "Correo electronico"/>
                                        <TextField secureTextEntry = {true} name = "password" size = "medium" placeholder = "Contraseña" />
                                    </Stack>
                                    <Stack spacing = "xlarge">
                                        <Button disabled = {!isValid} onPress = {() => { 
                                            handleSubmit();
                                        }} palette = "secondary">
                                            <Button.Text color = {theme.palette.body}>
                                                Ingresa
                                            </Button.Text>
                                        </Button>
                                        { userType === "client" && (
                                            <Fragment>
                                                <Text color="muted" textAlign="center"> 
                                                    o 
                                                </Text>
                                                <View style = {{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text color="muted" textAlign="center">
                                                        ¿Aun no tienes cuenta?
                                                    </Text>
                                                    <TouchableOpacity 
                                                        activeOpacity={0.8} 
                                                        onPress = {() => { navigation.navigate("sign-up-screen") }}
                                                        style = {{
                                                            marginLeft: theme.spacing.small
                                                        }}
                                                    >
                                                        <Text color="secondary"> 
                                                            Registrate 
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Fragment>
                                        )}
                                    </Stack>
                                </View>
                            </ImageBackground>
                        </Box>
                    </LoaderManager>
                )}
            </Formik>
        </Fragment>
    )
}

export default LoginScreen;