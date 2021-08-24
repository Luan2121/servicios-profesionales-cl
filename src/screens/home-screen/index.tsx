import React, { Fragment } from 'react';
import { Service } from "@types";
import { StatusBar, View, Text, FlatList } from 'react-native';
import { useTheme } from 'bumbag';
import { ClientNavigatorTab } from '@navigators/client-navigator/client-navigator';
// Components
import { Box, Input, Stack } from 'bumbag-native';
import { Header } from '@components/header/header';
import { ServiceCard } from '@components/service-card/service-card';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useServices } from '@hooks/models/use-service';
import { useAuth } from '@hooks/use-auth';
import { ScrollView } from 'react-native-gesture-handler';

type ServiceDetailScreenNavigationProp = BottomTabNavigationProp<
    ClientNavigatorTab,
    'home'
>

type Props = {
    navigation : ServiceDetailScreenNavigationProp
}

const HomeScreen = ({ 
    navigation
} : Props) => {
    const { theme } = useTheme();
    const { navigate } = navigation;
    const { user } = useAuth();
    const { data : services } = useServices();
    return (
        <Fragment>
            <StatusBar backgroundColor={theme.palette.primary} />
            <Header navigation = {navigation} >
                <View style = {{
                    paddingHorizontal: theme.spacing.medium,
                    paddingBottom: theme.spacing.medium
                }}>
                    <Stack spacing="medium">
                        <Box>
                            <Text style = {{
                                color: theme.palette.body,
                                fontWeight: 'bold',
                                fontSize: 32
                            }}>
                                Hola {user?.username}! 
                            </Text>
                            <Text style = {{
                                color: theme.palette.body
                            }}>
                                ¿Que servicios buscas hoy?
                            </Text>
                        </Box>  
                        <Input
                            iconBefore="search"
                            placeholder = "Buscar Servicio..."
                        />
                    </Stack>
                </View>
            </Header>
            <ScrollView style = {{
                flex: 1
            }}>
                <Box padding = "medium" marginBottom = "medium">
                    <FlatList
                        data = {services.filter( service => service.isActive )}
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
