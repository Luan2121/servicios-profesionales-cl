import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, useTheme } from 'bumbag';
import { Direction } from '@types';
import MapView from 'react-native-maps';
import { Icon } from 'bumbag-native';

type AddressCardProps = {
    item : Direction,
    onPress: (direction: Direction) => void,
    selected ?: boolean
}

const AddressCard = ({
    item,
    onPress,
    selected
}: AddressCardProps) => {
    const { theme } = useTheme();
    return (
        <TouchableWithoutFeedback onPress = {() => {
            onPress(item);
        }} >
            <View style = {{
                position: 'relative',
                elevation: 5
            }}>
                <MapView 
                    pitchEnabled = {false}
                    rotateEnabled = {false}
                    scrollEnabled = {false}
                    zoomEnabled = {false}
                    style = {{
                        width: 130,
                        height: 100,
                        borderRadius: 16
                    }}
                />
                {selected && (
                    <View style = {{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        backgroundColor: theme.palette.primary,
                        position: 'absolute',
                        top: 10, left: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon icon = "check" size = "100" color = { theme.palette.body } />
                    </View>
                )}
                <View style = {{
                    position: 'absolute',
                    bottom: 1, left: 0, right: 0,
                    width: 130,
                    height: 60,
                    padding: theme.spacing.small
                }}>
                    <View style = {{
                        backgroundColor: theme.palette.body,
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8
                    }}>
                        <Text style = {{
                            fontSize: 8
                        }}>
                            {item.address.substr(0,24) + '...'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const AddAddressCard = () => {
    const { theme } = useTheme();
    return (
        <View style = {{
            width: 170,
            height: 125,
            borderWidth: 2.5,
            borderRadius: 16,
            borderColor: theme.palette.muted,
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'dashed'
        }} >
            <Ionicons name="add" size={48} color={theme.palette.muted} />
        </View>
    )
}

AddressCard.Add = AddAddressCard;

export { AddressCard }