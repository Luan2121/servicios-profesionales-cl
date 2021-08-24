import React, { ReactElement, ReactNode } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from "bumbag";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

interface Props extends BottomTabBarProps{}

const TabBar = ({ 
    state, 
    descriptors, 
    navigation,
    activeTintColor,
    inactiveTintColor
} : Props ) => {
  const { theme } = useTheme();

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ 
      flexDirection: 'row', 
      backgroundColor: theme.palette.primary,
      height: 68
    }}>
      {state.routes.map( (route,index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const TabIcon : ReactNode = options.tabBarIcon?.({ 
          focused: isFocused, 
          color: isFocused ? activeTintColor ?? ' ': inactiveTintColor ?? ' ', 
          size: 24
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if( !isFocused && !event.defaultPrevented ){
            navigation.navigate(route.name);
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key = {`tab-${index}`}
            accessibilityRole="button"
            accessibilityState={ isFocused ? { selected: true } : {} }
            accessibilityLabel={ options.tabBarAccessibilityLabel }
            testID={ options.tabBarTestID }
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
              flex: 1, 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style = {{ marginTop: theme.spacing.medium }}>
              { TabIcon }
            </View>
            { isFocused && (
              <View style = {{
                height: 8,
                width: 56,
                backgroundColor: theme.palette.body,
                borderTopStartRadius: 28,
                borderTopEndRadius: 28
              }} />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export { TabBar }