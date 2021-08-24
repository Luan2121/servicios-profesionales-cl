import { Map, MapProps } from '../../map/map';
import React from 'react';
import { useField } from 'formik';
import { LatLng } from 'react-native-maps';

interface MapFieldProps extends MapProps {
    name: string
}

const MapField = ({ name, ...restProps } : MapFieldProps ) => {
    const [ field, meta, helpers ] = useField<LatLng>(name);
    return (
        <Map
            onPress = {(event) => {
                helpers.setValue(event.nativeEvent.coordinate);
            }}
            onAddMarker = {( coordinate : LatLng ) => {
                helpers.setValue(coordinate);
            }}
            {...restProps}
        />
    );
}

export { MapField };