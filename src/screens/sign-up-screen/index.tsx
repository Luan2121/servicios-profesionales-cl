import React, { Fragment } from 'react';
import { AuthNavigatorParamList } from '@navigators/auth-navigator/auth-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, StatusBar, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
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
            <SafeAreaView style = {{ flex: 1 }}>
                <LoaderManager isLoading = {isLoading} >
                    <Formik
                        initialValues = {formInitialValues}
                        validationSchema = {formValidation}
                        onSubmit = {(values) => {
                            run( auth.registerWithEmail(values) );
                        }}
                    >
                        {({ handleSubmit, isValid }) => (
                            <View style = {{
                                flex: 1,
                                backgroundColor: theme.palette.secondary,
                                height: '100%'
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
                                    <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>
                                        <View style = {{
                                            backgroundColor: theme.palette.body,
                                            borderTopEndRadius: 16,
                                            borderTopStartRadius: 16,
                                            padding: theme.spacing.xxlarge,
                                            justifyContent: 'space-between',
                                            flex: 1,
                                            flexGrow: 1
                                        }}>
                                            <Stack spacing="xlarge">
                                                <TextField name = "email" size = "medium" placeholder = "Email" />
                                                <TextField secureTextEntry = {true}  name = "password" size = "medium" placeholder = "Contraseña" />
                                            </Stack>
                                            <View style = {{
                                                marginTop: 36
                                            }}> 
                                                <Stack spacing = "xlarge">
                                                    <Button palette = "secondary" disabled={!isValid} onPress = {() => {
                                                        handleSubmit();
                                                    }}>
                                                        <Button.Text color = {theme.palette.body}>
                                                            Registrate
                                                        </Button.Text>
                                                    </Button>
                                                    <Text color="muted" textAlign="center"> o </Text>
                                                    <View style = {{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text color="muted" textAlign="center">
                                                            ¿Ya tienes cuenta?
                                                        </Text>
                                                        <TouchableOpacity 
                                                            activeOpacity={0.8} 
                                                            style = {{
                                                                marginLeft: theme.spacing.small
                                                            }}
                                                        >
                                                            <Text color="secondary"> 
                                                                Ingresa 
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </Stack>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </ImageBackground>
                            </View>
                        )}
                    </Formik>
                </LoaderManager>
            </SafeAreaView>
        </Fragment>
    )
}

export default SignUpScreen;