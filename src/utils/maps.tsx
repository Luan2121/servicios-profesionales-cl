import { GOOGLE_MAPS_API_KEY } from "@env"
import axios from "axios"
import { LatLng } from "react-native-maps";

const geocode = async (text : string) => {
    const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {params: {
            address: text,
            key: GOOGLE_MAPS_API_KEY
        }}
    );

    const results = response.data.results[0];

    const addresses = results.address_components.map( (address) => (
        { address: address.long_name }
    ));

    const location = results.geometry.location;

    return {
        addresses: addresses as any[],
        location: {
            latitude: location.lat,
            longitude: location.lng
        } as LatLng
    }
}

export { geocode };