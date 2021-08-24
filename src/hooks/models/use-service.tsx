import { useClient } from "@hooks/use-client";
import { createServiceFromResponse } from "@utils/models";
import { useQueries, useQuery } from "react-query";
import { Service } from '@types';

let servicesIds = [1,2,4,5,16,31,33,32];

const useServices = () => {
    const client = useClient();
    const servicesQueries = useQueries(
         servicesIds.map( id => {
            return {
                queryKey: ["services",id],
                queryFn: () => client("", { 
                    data: { "op": "getRubro" , idrubro: id}, method: 'POST' }
                ).then( createServiceFromResponse ),
                keepPreviousData: true,
                initialData: []
            }
        })
    );
    const allServices : Service[] = servicesQueries.map(
        query => query.data as Service
    );
    return {
        data: allServices
    }
}

const useServicePrice = (serviceId: string) => {
    const client = useClient();
    return useQuery( 
        [ "service-price" , serviceId ],
        () => client("", {
            method: 'POST',
            data: {
                "op":"getPrecio",
                "idsr":serviceId
            }
        }).then( response => response.precio ), {
            keepPreviousData: true,
        }
    )
}

export { useServices, useServicePrice };