import { useQuery } from "react-query";
import { useClient } from "../use-client";
import { User, OrderItem } from '@types';
import { createOrdersFromResponse } from "@utils/models";

const useOrders = ( user ?: User ) => {
    const client = useClient();
    return useQuery(
        "orders",
        () => client( "", {
            method: 'POST',
            data: {
                "op":"getOtsAbiertas",
	            "rut": user?.rut
            }
        }), {
            initialData: [],
            select: data => {
                const orders : OrderItem[] = createOrdersFromResponse(data);
                return orders;
            }
        }
    )

};

export { useOrders };