import { Header } from '@components/header/header';
import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountNavigatorParamList } from '@navigators/account-navigator/account-navigator';
import { Stack, Button, Box } from 'bumbag-native';
import { Formik } from 'formik';
import { formInitialValues, formValidation } from './data';
import { TextField } from '@components/formik';
import { useUpdatePassword } from '@hooks/models';
import { useAuth } from '@hooks/use-auth';

type UserDirectionsNavigationProp = StackNavigationProp<
    AccountNavigatorParamList,
    'update-password'
>

type Props = {
    navigation: UserDirectionsNavigationProp
}


const UpdatePasswordScreen = (props : Props) => {
    const { mutateAsync: updatePassword, isLoading } = useUpdatePassword();
    const { user } = useAuth();
    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView style = {{ flex: 1 }}>
                <Header
                    variant = "stack"
                    title = "Actualizar contraseña" 
                    navigation = {props.navigation}
                />
                <Formik 
                    initialValues = {formInitialValues} 
                    validationSchema = {formValidation}
                    onSubmit = {(values) => {
                        updatePassword({...values, rut: user?.rut ?? "" }).then(
                            () => { alert("Contraseña actualizada correctamente") },
                            () => { alert("Error al actualizar su contraseña") }
                        )
                    }}
                >
                    {({ handleSubmit }) => (
                        <Box padding = "large"> 
                            <Stack spacing = "large">
                                <TextField
                                    placeholder = "Nueva contraseña"
                                    size = "medium"
                                    name = "password"
                                />
                                <Button 
                                    size = "large"
                                    palette = "primary"
                                    onPress = {() => { handleSubmit() }} 
                                    disabled = {isLoading}
                                    isLoading = {isLoading} 
                                >
                                    <Button.Text>
                                        Guardar
                                    </Button.Text>
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            </SafeAreaView>
        </Fragment>
    )
}

export default UpdatePasswordScreen;