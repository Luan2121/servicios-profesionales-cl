import { useCallback } from "react";
import { client, ClientConfig } from "@api";
import { useAuth } from "./use-auth";
const useClient = () => {
    const { user } = useAuth();
    const token = user?.token;
    return useCallback(
        (endpoint : string,config : ClientConfig  ) => client(endpoint, {...config,token}),
        [token]
    );
}

export { useClient }