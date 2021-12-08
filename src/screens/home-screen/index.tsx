import React, { Fragment } from 'react';
import { StatusBar, View, Text, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from 'bumbag';
import { ClientNavigatorStack, ClientNavigatorTab } from '@navigators/client-navigator/client-navigator';
// Components
import { Box, Input, Stack } from 'bumbag-native';
import { Header } from '@components/header/header';
import { ServiceCard } from '@components/service-card/service-card';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useServices } from '@hooks/models/use-service';
import { useAuth } from '@hooks/use-auth';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSearch } from '@hooks/use-search';
import { Alert } from '@components/alerts/alerts';

type HomeScreenNavigationProp = BottomTabNavigationProp<
    ClientNavigatorTab & ClientNavigatorStack,
    'home'
>

type Props = {
    navigation : HomeScreenNavigationProp
}

const HomeScreen = ({ 
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { navigate } = navigation;
    const { user, isGuest } = useAuth();
    const { data : services } = useServices();
    const [ searchedServices , searchProps ] = useSearch(services);
    return (
        <Fragment>
            <StatusBar backgroundColor={theme.palette.primary} />
            <SafeAreaView style = {{ flex: 1 }}>
                <Header navigation = {navigation} >
                    <View style = {{
                        paddingHorizontal: theme.spacing.medium,
                        paddingBottom: theme.spacing.medium
                    }}>
                        <Stack spacing="medium">
                            <Box>
                                {!isGuest && (
                                    <Text style = {{
                                        color: theme.palette.body,
                                        fontWeight: 'bold',
                                        fontSize: 32
                                    }}>
                                        Hola {user?.username}! 
                                    </Text>
                                )}
                                <Text style = {{
                                    color: theme.palette.body
                                }}>
                                    ¿Que servicios buscas hoy?
                                </Text>
                            </Box>  
                            <Input
                                iconBefore="search"
                                placeholder = "Buscar Servicio..."
                                value = {searchProps.value}
                                onChangeText = {searchProps.onTextChange}
                            />
                        </Stack>
                    </View>
                </Header>
                <ScrollView style = {{
                    flex: 1
                }}>
                    { !(isGuest && user?.hasProfile) && (
                        <View style = {{
                            padding: theme.spacing.medium,
                            paddingBottom: 0
                        }}>
                            <Alert tone = "warning" icon = "warning">
                                <Text>
                                    Aun no completas tu perfil
                                </Text>
                                <TouchableWithoutFeedback style = {{
                                    paddingTop: 15
                                }} onPress = {() => {
                                    navigation.navigate("profile");
                                }}>
                                    <Text style = {{
                                        color: theme.palette.warning,
                                        textDecorationLine: "underline",
                                        textDecorationColor: theme.palette.warning,
                                        fontSize: 10
                                    }}>
                                        Presiona aqui para completar tus datos
                                    </Text>
                                </TouchableWithoutFeedback>
                            </Alert>
                        </View>
                    )}
                    <Box padding = "medium" marginBottom = "medium">
                        <FlatList
                            data = {searchedServices.filter( service => service.isActive )}
                            ListHeaderComponent = {(
                                <Text style = {{
                                    fontSize: 18,
                                    fontWeight: '100',
                                    marginBottom: theme.spacing.medium
                                }}>
                                    Todos los servicios
                                </Text>
                            )}
                            keyExtractor = { (item) => item.name }
                            renderItem = {({ item }) => (
                                <ServiceCard item = {item} onPress = {(e,item) => {
                                    navigate( 'service-details' , { service: item });
                                }} />
                            )}
                        />
                    </Box>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    )
}

/*
const services : Service[] = [
    { name: "Gasfiter", price: 20000, image: Assets.images.gasfiter, subServices: [] , id: "1" },
    { name: "Techumbre", price: 20000, image: Assets.images.techumbre, subServices: [] , id: "1"  },
    { name: "Calefación", price: 20000, image: Assets.images.heating, subServices: [] , id: "1"  },
    { name: "Electricidad", price: 20000, image: Assets.images.electricity, subServices: [] , id: "1"   },
    { name: "Detección", price: 20000, image: Assets.images.inspection, subServices: [] , id: "1"  },
    { name: "Destape", price: 20000, image: Assets.images.cleaning, subServices: [] , id: "1" },
    { name: "Construccion", price: 20000, image: Assets.images.construction, subServices: [] , id: "1" },
    { name: "Ductopia", price: 20000, image: Assets.images.ductopia, subServices: [] , id: "1" }
]
*/

export default HomeScreen;
