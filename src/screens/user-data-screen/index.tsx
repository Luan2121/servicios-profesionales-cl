import { Header } from '@components/header/header';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountNavigatorParamList } from '@navigators/account-navigator/account-navigator';
import { Stack, Button, Box } from 'bumbag-native';
import { Formik } from 'formik';
import { formInitialValues, formValidation, FormType } from './data';
import { TextField, PhoneField } from '@components/formik';
import { useUpdateUserData } from '@hooks/models';
import { useAuth } from '@hooks/use-auth';
import { User } from '@types';

type UserDirectionsNavigationProp = StackNavigationProp<
    AccountNavigatorParamList,
    'my-data'
>

type Props = {
    navigation: UserDirectionsNavigationProp
}


const UserDataScreen = (props : Props) => {
    const { user } = useAuth();
    const { mutateAsync : updateUserData, isLoading } = useUpdateUserData();
    return (
        <Fragment>
            <StatusBar/>
            <Header
                variant = "stack"
                title = "Actualizar datps" 
                navigation = {props.navigation}
            />
            <Formik 
                initialValues = {getInitialValues(formInitialValues, user)} 
                validationSchema = {formValidation}
                onSubmit = {(values) => {
                    updateUserData({
                        ...values,
                        rut: user?.rut ?? ""
                    }).then(
                        () => { alert("Tus datos se han actualizado correctamente") },
                        () => { alert("No se han podido actualizar tus datos") }
                    )
                }}
            >
                {({ handleSubmit }) => (
                    <Box padding = "large"> 
                        <Stack spacing = "large">
                            <TextField name = "user" size = "medium" placeholder = "Usuario"  />
                            <TextField name = "email" size = "medium" placeholder = "Email" />
                            <PhoneField 
                                name = "phone"
                                size = "medium"
                                placeholder = "Telefono"
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
        </Fragment>
    )
}

const getInitialValues = (values : FormType ,user : User | undefined ) : FormType => ({
    user: user?.username ?? values.user,
    phone: user?.phone ?? values.phone,
    email: user?.email ?? values.phone
})

export default UserDataScreen;