import { useClient } from "../use-client";
import { User, Message } from "@types";
import { useQuery } from "react-query";
import { createMessagesFromResponse } from "@utils/models";

const useMessages = (user ?: User) => {
    const client = useClient();
    return useQuery(
        "messages",
        () => client("", {
            data: {
                "op":"getMensajes",
                "rut": user?.rut
            },
            method: 'POST'
        }) , {
            initialData: [],
            select: data => {
                const messages : Message[] = createMessagesFromResponse(data);   
                return messages || [];     
            }
        } 
    );
};

const useCountMessages = (user ?: User) => {
    const client = useClient();
    return useQuery(
        "message-count",
        () => client("", {
            data: {
                "op":"getCountMensajes",
                "rut": user?.rut
            },
            method: 'POST'
        }) , {
            initialData: 0,
            select: data => {
                if(data){
                    return parseInt( data.resp );
                }

                return 0
            }
        } 
    );
}

export { useMessages, useCountMessages };