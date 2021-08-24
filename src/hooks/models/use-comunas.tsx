import { useClient } from '../use-client';
import { useQuery } from 'react-query';
import { Comuna } from '@types';
import { createComunasFromResponse } from '@utils/models';

const useComunas = (cityId) => {
    const client = useClient();
    const comunaPromise = client("",{
        data: { op: "getComunas", idciudad: cityId },
        method: 'POST'
    });
    return useQuery<Comuna[],Error, Comuna[]>(
        ["comunas",cityId],
        () => comunaPromise.then( res => createComunasFromResponse(res.resp) ) , {
            keepPreviousData: true,
            initialData: [],
            enabled: !!cityId
        }
    )
}

export { useComunas };