import { Subscription } from '@unimodules/core';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Platform, AppState } from "react-native";
// SDK
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
//import * as TaskManager from 'expo-task-manager';
// Utils
import { 
    registerForPushNotificationsAsync
} from "@utils";
import { useClient } from './use-client';

type LocationError = {
    message: string
}

type LocationStatus = {
    foreground: Location.PermissionStatus | boolean,
    background: Location.PermissionStatus | boolean
}

const useNotification = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | boolean>(false);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token || ''));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        return () => {
            if(notificationListener.current){
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if(responseListener.current){
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return { token: expoPushToken , notification };
};

const useNotificationChannel = () => {
    const [ channel , setChannel ] = useState<Notifications.NotificationChannel | null>(null);
    useEffect(
        () => {
            ( async () => {
                if(Platform.OS === "android"){
                    Notifications.setNotificationChannelAsync(
                        'map-tracker', {
                            name: 'map-tracker',
                            importance: Notifications.AndroidImportance.LOW,
                            vibrationPattern: [0, 250, 250, 250],
                            lightColor: "#FF231F7C",
                            sound: null,
                            enableLights: false,
                            enableVibrate: false,
                            showBadge: false
                        }
                    ).then( channel => setChannel(channel) );
                }
            })();
        } , []
    );
    return { channel };
};

type TUseLocation = {
    revalidationInterval: number
}

const useLocation = ({ revalidationInterval } : TUseLocation) => {
    const [ location , setLocation ] = useState<Location.LocationObject | null>(null);
    const [ status , setStatus ] = useState<LocationStatus>({ foreground: false, background: false });
    const [ error , setError ] = useState<LocationError | null>(null);
    useNotification();
    useEffect( () => {
        (async () => {
            try{
                let { status : backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                let { status : foregroundStatus } = await Location.requestForegroundPermissionsAsync();
                if(foregroundStatus !== "granted"){
                    setError({ message: 'Permission to access location on foreground was denied'});
                }
                if(backgroundStatus !== "granted"){
                    setError({ message: 'Permission to access location on background was denied'});
                }
                setStatus({
                    foreground: foregroundStatus,
                    background: backgroundStatus
                });
            }catch(error){
                console.log(error);
                setError({ message: "Error al pedir permisos para localizacion" });
            }
        })();
    }, [setStatus,setError]);

    useEffect(
        () => {
            ( async () => {
                if(status.background === "granted" || status.foreground === "granted" ){
                    await Location.watchPositionAsync( 
                        {
                            timeInterval: revalidationInterval,
                            distanceInterval: 1
                        }, 
                        (location) => {
                            //console.log("update");
                            setLocation(location);
                        }
                    );
                }
            })();

        } , [status,setLocation]
    );

    return { locationPermissionStatus: status , location , error };
};

type TUseBackgroundLocationTask = {
    revalidationInterval: number,
};

const useBackgroundLocationTask = ({ revalidationInterval } : TUseBackgroundLocationTask) => {
    useEffect( () => {
        AppState.addEventListener('change',updateAppLocationState);
        return () => {
            AppState.removeEventListener('change',updateAppLocationState);
        };
    } , []);

    const updateAppLocationState = useCallback(async appState => {
        if (appState === 'active') {
          try {
            const hasStartedLocationUpdatesAsync = 
                await Location.hasStartedLocationUpdatesAsync('background-map-tracker');
    
            if (hasStartedLocationUpdatesAsync) {
                Location.stopLocationUpdatesAsync('background-map-tracker');
            }
          } catch (error) {
            console.log('error',error);
          }
        }
        if (appState === 'background') {
            //console.log('app is in background');
            Location.startLocationUpdatesAsync('background-map-tracker', {
                accuracy: Location.Accuracy.BestForNavigation,
                distanceInterval: 1, //meters
                //ios
                showsBackgroundLocationIndicator: true,
                activityType: Location.ActivityType.AutomotiveNavigation,
                pausesUpdatesAutomatically: true,
                //android
                timeInterval: revalidationInterval, //milliseconds
                foregroundService: {
                    notificationTitle: 'map-tracker',
                    notificationBody: 'En service. Touchez pour ouvrir',
                    notificationColor: '#2a9d8f',
                },
            });
        }
      }, []);
};

type TMutateLocation = {
    lat: string,
    lng: string,
    rut: string
}

const useMutateLocation = () => {
    const client = useClient();
    return useMutation(
        ({ lat, lng, rut } : TMutateLocation ) => client("", {
            data: {
                "op":"guardarUbicacion",
                "rut":rut,
                "lat":lat,
                "lng":lng
            },
            method: 'POST'
        })
    )
}

export { 
    useNotification, 
    useLocation, 
    useNotificationChannel, 
    useBackgroundLocationTask, 
    useMutateLocation 
};