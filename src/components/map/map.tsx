import { geocode } from '@utils/maps';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { AnimatedRegion, LatLng, MapViewProps, Marker, MarkerProps } from 'react-native-maps';


export interface MapProps extends MapViewProps {
    height: number,
    width ?: number, 
    address?: string,
    onAddMarker ?:( coordinate : LatLng ) => void 
};

type TMarker = LatLng | AnimatedRegion;

const Map = ({
    height, 
    width,
    onAddMarker,
    address,
    onPress
} : MapProps) => {
    const [markers,setMarkers] = useState< TMarker[] >([]);
    const mapRef = useRef<MapView>(null);
    useEffect( () => {
        if(address){
            geocode(address).then(
                result => {
                    if( result.location && result.location.latitude && result.location.longitude ){
                        setMarkers( oldMarkers => [...oldMarkers, result.location ]);
                        onAddMarker?.(result.location);
                        if( mapRef.current ){
                            mapRef.current.animateToCoordinate(result.location);
                        }
                    }
                }
            )
        }
    } , [address]);
    return (
        <MapView
            ref = {mapRef}
            onPress = {(event) => {
                onPress?.(event);
                setMarkers( () => [event.nativeEvent.coordinate] );
            }}
            style = {{
                width: width ?? Dimensions.get('screen').width,
                height 
            }}
            initialRegion={{
                latitude: -20.2307033,
                longitude: -70.1356692,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {markers.map( (marker,id) => {
                return (
                    <Marker
                        key = {`marker-${id}`}
                        coordinate = {{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        } as MarkerProps['coordinate']}
                    />
                )
            })}
        </MapView>
    );
}

export { Map };