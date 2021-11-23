import { useQuery } from "react-query";
import { useClient } from "../use-client";
import { User   } from '@types';
import { createOrdersFromResponse, createOrderDetailFromResponse, createTechnicianOrderDetailFromResponse } from "@utils/models";
import { useAuth } from "@hooks/use-auth";

const useOrders = ( user ?: User ) => {
    const client = useClient();
    return useQuery(
        "orders",
        async () => {
            const ordersData = await client( "", {
                method: 'POST',
                data: {
                    "op": user?.type === "client" ? "getOtsAbiertas" : "getOtsAbiertasTecnico",
                    "rut": user?.rut
                }
            });
            return createOrdersFromResponse(ordersData);
        }, {
            initialData: [] 
        }
    );
};

const useOrderDetail = ({ id }) => {
    const client = useClient();
    const { user } = useAuth();
    return useQuery(
        ["order-detail", id],
        async () => {
            const orderDetailData = await client( "", {
                method: 'POST',
                data: {
                    "op": user?.type === "client" ? "getOt" : "getOtdetalle",
                    "idot":id,
                    "rut": user?.rut
                }
            });
            return user?.type === 'client' 
                ? createOrderDetailFromResponse(orderDetailData)
                : createTechnicianOrderDetailFromResponse(orderDetailData)
        }, {
            initialData: null
        }
    );
}

export { useOrders, useOrderDetail };