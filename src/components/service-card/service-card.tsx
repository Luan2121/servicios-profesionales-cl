import React from 'react';
import { Service } from '@types';
import { View, Text, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useTheme } from 'bumbag';
import { AntDesign } from '@expo/vector-icons';

interface ServiceCardProps {
    item: Service,
    onPress: (event : GestureResponderEvent, service : Service) => void
}

const ServiceCard = ({
    item,
    onPress
} : ServiceCardProps ) => {
    const { theme } = useTheme();
    return(
        <TouchableOpacity onPress = {(event) => { onPress(event,item) }}>
            <View style = {{
                height: 150,
                flexDirection: 'row',
                borderRadius: 32,
                overflow: 'hidden',
                marginBottom: theme.spacing.large,
                borderColor: theme.palette.muted,
                borderWidth: 1
            }}>
                <View style = {{
                    flex: 1,
                    padding: theme.spacing.large,
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <Text style = {{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: theme.palette.primary
                        }}>
                            {item.name}
                        </Text>
                        <Text style = {{
                            color: theme.palette.muted
                        }}>
                            a partir de {item.price}
                        </Text>
                    </View>
                    <View>
                        <AntDesign name="arrowright" size={24} color={theme.palette.primary} />
                    </View>
                </View>
                <View style = {{
                    backgroundColor: theme.palette.secondary,
                    borderTopStartRadius: 75,
                    borderTopEndRadius: 75,
                    borderBottomStartRadius: 64,
                    height: 130,
                    alignSelf: 'flex-end'
                }}>
                    <Image
                        style = {{
                            height: 130,
                            width: 150,
                            
                        }}
                        source = {item.image}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export { ServiceCard }