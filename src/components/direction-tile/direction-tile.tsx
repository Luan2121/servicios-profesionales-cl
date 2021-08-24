import React from 'react';
import { View, Text } from 'react-native';
import { Button, ButtonProps, Icon } from 'bumbag-native';
import { useTheme } from 'bumbag';
import { Direction } from '@types';
import { EvilIcons } from '@expo/vector-icons';

type DirectionTileProps = {
    item: Direction,
    onDelete ?: ButtonProps['onPress']
}

const DirectionTile = ({ item, onDelete } : DirectionTileProps) => {
    const { theme } = useTheme();
    return (
        <View style = {{
            flexDirection: 'row',
            padding: theme.spacing.small,
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style = {{
                flex: 1
            }}>
                <Text>
                    {item.address}
                </Text>
            </View>
            <View style = {{
                flex: 0,
                marginLeft: theme.spacing.medium
            }}>
                <Button variant = "outline" palette = "primary" onPress = {onDelete} >
                    <EvilIcons name="trash" size={24} color="#FFFFFF" />
                </Button>
            </View>
        </View>
    )
}

export { DirectionTile };