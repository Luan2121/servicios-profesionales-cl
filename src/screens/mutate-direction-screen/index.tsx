import { Header } from '@components/header/header';
import { Search } from '@components/search/search';
import { AccountNavigatorParamList } from '@navigators/account-navigator/account-navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Stack, Box, Button } from 'bumbag-native';
import { Formik } from 'formik';
import { TextField, SearchField } from '@components/formik';
import { Map } from '@components/map/map';
import { formInitialValues, formValudation } from './data';
import { geocode } from '@utils';
import { useTheme } from 'bumbag';
import { useMutateDirection } from '@hooks/models/use-directions';
import { useAuth } from '@hooks/use-auth';
import { MapField } from '@components/formik/map-field/map-field';

type MutateDirectionScreenNavigationProp = StackNavigationProp<
    AccountNavigatorParamList,
    'my-directions'
>

type Props = {
    navigation: MutateDirectionScreenNavigationProp
}

const MutateDirectionScreen = ({
    navigation
} : Props ) => {
    const { theme } = useTheme();
    const { mutateAsync : mutateDirection, isLoading } = useMutateDirection();
    const { user } = useAuth();
    return (
        <Fragment>
            <Header 
                title = "Nueva direccion"
                variant = "stack"
                navigation = {navigation}
            />
            <Formik
                initialValues = {formInitialValues}
                validationSchema = {formValudation}
                onSubmit = {(values) => {
                    mutateDirection({
                        address: values.address,
                        apartment: values.apartment,
                        street: values.street,
                        streetNumber: values.streetNumber,
                        rut: user?.rut ?? "",
                        coordinate: values.coordinate ?? undefined
                    }).then( () => navigation.goBack() )
                }}
            >
                {({ handleSubmit, values }) => (
                    <ScrollView style = {{
                        flex: 1,
                        height: '100%'
                    }}>
                        <View style = {{
                            justifyContent: 'space-between',
                            height: '100%'
                        }}>
                            <Box padding = "xlarge">
                                <Stack spacing = "xlarge">
                                    <SearchField
                                        name = "address"
                                        placeholder = "Calle, direccion, ciudad"
                                        size = "medium"
                                        getOptions = {async (text) => {
                                            return geocode(text).then(
                                                ({ addresses }) => addresses
                                            )
                                        }}
                                        getOptionLabel = {(option) => option.address}
                                    />
                                    <TextField 
                                        name = "apartment"
                                        placeholder = "Apt, habitacion"
                                        size = "medium"
                                    />
                                    <TextField 
                                        name = "street"
                                        placeholder = "Calle, ruta"
                                        size = "medium"
                                    />
                                    <TextField 
                                        name = "streetNumber"
                                        placeholder = "Nro de calle"
                                        size = "medium"
                                    />
                                </Stack>
                            </Box>
                            <View style = {{
                                borderTopEndRadius: 16,
                                borderTopStartRadius: 16,
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <MapField
                                    name = "coordinate"
                                    address = {values.address}
                                    height = {300}
                                />
                                <View style = {{
                                    position: 'absolute',
                                    bottom: 50, left: 0, right: 0,
                                    paddingHorizontal: theme.spacing.large
                                }}>
                                    <Button disabled = {isLoading} isLoading = {isLoading} palette = "primary" size = "large" onPress = {() => handleSubmit()}>
                                        <Button.Text>
                                            Continuar
                                        </Button.Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </Fragment>
    );
}

export default MutateDirectionScreen;