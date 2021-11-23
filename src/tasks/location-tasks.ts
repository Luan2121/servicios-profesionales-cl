import { schedulePushNotification } from '@utils/notifications';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { TClientFunction } from '@api';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    })
});

type TaskBody = {
    locations: Location.LocationObject[],
    accuracy: Location.Accuracy
}

type TLocationTracker = {
    user_rut ?: string,
    client: TClientFunction
}

const configureLocationTracker = ({ user_rut , client } : TLocationTracker ) => {
    TaskManager.defineTask(
        'background-map-tracker', 
        ({ data , error }) => {

            const { locations } = data as TaskBody;

            if(error){
                console.log('error');
                return;
            }
            //console.log(`received new locations`,locations);
    
            const { latitude: lat , longitude: lng, accuracy } = locations[0]?.coords;

            client("", { 
                data: {
                    "op":"guardarUbicacion",
                    "rut":user_rut,
                    "lat":lat,
                    "lng":lng
                },
                method: 'POST'
            }).then( () => {
                console.log("Ubicacion guardada");
            });

            schedulePushNotification({
                content: {
                    title: `Map Tracker`,
                    body: `latitud: ${lat} | longitud: ${lng} | precision: ${ (accuracy || 0).toFixed(2)}`,
                    data: { data: 'goes here' },
                }
            });
        }
    );
}

export { configureLocationTracker };