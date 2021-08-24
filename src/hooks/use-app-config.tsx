import { useState, useEffect } from 'react';
import { createCitiesFromResponse, createServiceFromResponse } from '@utils';
import * as ExpoSplash from 'expo-splash-screen';
import * as Poppins from '@expo-google-fonts/poppins';
import { useQueryClient } from 'react-query';
import { client } from '@api';

let servicesIds = [1,2,4,5,16,31,33,32];

const useAppConfig = () => {
    const { useFonts , ...fonts } = Poppins;
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [fontsLoaded] = useFonts(fonts);
    const queryClient = useQueryClient();

    useEffect( () => {
        const loadResourcesAndDataAsync = async () => {
            try {
                queryClient.clear()
                ExpoSplash.preventAutoHideAsync();
                const cityPromise = client("", { data: { "op": "getCiudades" }, method: 'POST' } );
                const servicePromises = servicesIds.map(
                    id => client("", { data: { "op": "getRubro" , idrubro: id + 1}, method: 'POST' })
                );
                const [ cityResponse, ...serviceResponse ] = await Promise.all([ cityPromise , ...servicePromises ]);
                const cities = createCitiesFromResponse(cityResponse.resp);
                queryClient.setQueryData("cities",cities);
                for( const response of serviceResponse ) {
                    if( parseInt( response.resp[0].rub_visibilidad ) ){
                        queryClient.setQueryData(
                            [ "services" , response.resp[0].idrubro] , 
                            createServiceFromResponse(response) 
                        )
                    }
                }
            }catch( err ){
                console.log(err);
                console.warn("Errors while loading app data");
            }finally {
                setLoadingComplete(true);
                ExpoSplash.hideAsync();
            }
        }
        loadResourcesAndDataAsync();
    } , []);

    return {
        showSplash: !fontsLoaded && !isLoadingComplete
    }

}

export { useAppConfig };