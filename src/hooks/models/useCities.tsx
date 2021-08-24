import { useClient } from '../use-client';
import { useQuery } from 'react-query';
import { City } from '@types';
import { createCitiesFromResponse } from '@utils/models';

const useCities = () => {
    const client = useClient();
    const cityPromise = client("",{
        data: { op: "getCiudades" },
        method: 'POST'
    });
    return useQuery<City[],Error, City[],"cities">(
        "cities",
        () => cityPromise.then( res => createCitiesFromResponse(res.resp) ) , {
            keepPreviousData: true,
            initialData: []
        }
    )
}

export { useCities };