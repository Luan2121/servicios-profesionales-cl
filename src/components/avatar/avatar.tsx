import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Image, ImageSourcePropType, ViewStyle, FlexAlignType} from 'react-native';
import { useTheme } from 'bumbag';

type AvatarSize = 'small' | 'large'

interface AvatarProps {
    size?: AvatarSize,
    src?: ImageSourcePropType
}

const Avatar = ({
    size = 'small',
    src
} : AvatarProps) => {
    const { theme } = useTheme();
    const { size : iconSize , ...styles } = getAvatarProps({ size })
    return (
        <View style = {{
            backgroundColor: theme.palette.mutedPrimary,
            ...styles
        }}>
            {src != undefined 
                ? <Image source = {src} />
                : <AntDesign size = {iconSize} name = "user" color = {theme.palette.avatar} />
            }
        </View>
    );
}

const sizeMap = {
    small: 24,
    large: 86
}

const getAvatarProps = (props : Pick<AvatarProps,'size'>) => {
    const s = sizeMap[props.size || 'small'];
    return {
        width: s + 8,
        height: s + 8,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as FlexAlignType,
        borderRadius: 8,
        size: s
    }
}

export { Avatar };