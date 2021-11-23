import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const registerForPushNotificationsAsync = async () => {
    let token : string = "";
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
};

const schedulePushNotification = async ({
    content
}) => {
    await Notifications.scheduleNotificationAsync({
        content,
        identifier: 'tracker',
        trigger: { 
            seconds: 1,
            channelId: 'map-tracker'
        },
    });
};

const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

export const sendNotification = async ({content}) => {
    await Notifications.presentNotificationAsync({
        ...content
    });
};

export { 
    registerForPushNotificationsAsync, 
    schedulePushNotification, 
    cancelAllNotifications
};