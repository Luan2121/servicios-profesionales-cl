import { User, Direction } from '@types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useClient } from '../use-client';
import { createDirectionsFromResponse } from '@utils/models';
import { LatLng } from 'react-native-maps';

const useDirections = (user ?: User) => {
    const client = useClient();

    const directionsPromise = client(
        "",
        {method: 'POST', data: {
            "op":"getDirecciones",
	        "rut": user?.rut ?? 1
        }}
    );

    return useQuery<Direction[],Error>(
        "directions",
        () => directionsPromise.then( respone => createDirectionsFromResponse(respone) ),
        { 
            keepPreviousData: true,
            initialData: []
        }
    )
}

const useMutateDirection = () => {
    const client = useClient();
    const queryClient = useQueryClient();
    return useMutation(
        (form : MutateDirectionType ) => client("", {
            method: 'POST',
            data: {
                "op":"guardarDireccion",
                "rut": form.rut,
                "txtsearc": form.address,
                "depto_txt": form.apartment,
                "direccion":{
                    "route": form.street,
                    "street_number": form.streetNumber,
                    "administrative_area_level_1":"comunadesc",
                    "x": form.coordinate?.latitude ?? "",
                    "y": form.coordinate?.longitude ?? ""
                }
            }
        }), {
            onSuccess: (data,variables) => {
                queryClient.setQueryData<Direction[]>( 'directions', (oldDirs) => {
                    client("",{
                        method: 'POST',
                        data: {
                            "op":"getDirecciones",
	    	                "rut": variables.rut
                        }
                    }).then( response => {
                        const directions = createDirectionsFromResponse(response);
                        return directions as Direction[];
                    })
                    return [];
                });
            }
        }
    )
}

const useDeleteDirection = () => {
    const client = useClient();
    const queryClient = useQueryClient();
    return useMutation(
        ({ directionId , rut } : DeleteDirectionType ) => client("",{
            method: 'DELETE',
            data: {
                "op":"delDireccion",
                "rut":rut,
                "iddel":directionId
            }
        }) , {
            onSuccess: (data,variables) => {
                queryClient.setQueryData<Direction[]>('directions', (oldDirs) => {
                    if(oldDirs?.length){
                        return oldDirs.filter( dir => dir.id !== variables.directionId );
                    }
                    return []
                });
            }
        }
    )
}

type DeleteDirectionType = {
    directionId: string,
    rut: string
}

type MutateDirectionType = {
    rut: string,
    address: string,
    apartment: string,
    street: string,
    streetNumber: string,
    coordinate?: LatLng
}

export { useDirections, useMutateDirection, useDeleteDirection };