import React, { Fragment } from 'react';
import { useTheme } from 'bumbag';
import { StatusBar, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '@hooks/use-auth';
import { TechnicianNavigatorParamList } from '@navigators/technician-navigator/technician-navigator';
import { Header } from '@components/header/header';
import { useMessages } from '@hooks/models/use-messages';
import { FlatList } from 'react-native-gesture-handler';
import { Message } from '@types';
import { Avatar } from '@components/avatar/avatar';

type MessageScreenNavigationProp = StackNavigationProp<
    TechnicianNavigatorParamList,
    'messages'
>

type Props = {
    navigation : MessageScreenNavigationProp 
};

const MessageScreen = ({navigation} : Props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { data : messages } = useMessages(user);

    return (
        <Fragment>
            <StatusBar/>
            <SafeAreaView style = {{ flex: 1 }}>
                <Header
                    variant = "stack"
                    navigation = {navigation}
                    title = "Tus mensajes"
                />
                <ScrollView style = {{
                    flex: 1,
                    padding: theme.spacing.large,
                    marginBottom: theme.spacing.large
                }}>
                    <FlatList
                        data = {messages || []}
                        renderItem = {({ item }) => (
                            <View style = {{
                                marginBottom: theme.spacing.medium
                            }}>
                                <MessageItem item = {item} />
                            </View>
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    )
}

type MessageItemProps = {
    item : Message
};

const MessageItem = ({ item } : MessageItemProps) => {
    const { theme } = useTheme();
    return (
        <View style = {{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 0
        }}>
            <View style = {{
                paddingTop: theme.spacing.small
            }}>
                <Avatar size = "small" />
            </View>
            <View style = {{
                marginLeft: theme.spacing.medium,
                position: 'relative',
                flex: 1
            }}>
                <View
                    style = {{
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderLeftWidth: 8,
                        borderRightWidth: 8,
                        borderBottomWidth: 8,
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        borderBottomColor: theme.palette.mutedLight,
                        position: 'absolute',
                        left: -12,
                        top: 18,
                        transform: [{ rotate: "-90deg" }]
                    }}
                />
                <View style = {{
                    padding: theme.spacing.large,
                    backgroundColor: theme.palette.mutedLight,
                    borderRadius: 16
                }}>
                    <Text>
                        {item.content}
                    </Text>
                    <Text style = {{
                        textAlign: 'right',
                        fontSize: 10,
                        color: theme.palette.muted,
                        marginTop: 4
                    }}>
                        enviado: {item.date}
                    </Text>
                </View>
            </View> 
        </View>
    );
};

export default MessageScreen;