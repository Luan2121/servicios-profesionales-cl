import axios, { AxiosRequestConfig } from "axios";
import * as auth from "./auth-provider";
import { BASE_API_URL } from "@env";

const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 30000
})

export interface ClientConfig extends AxiosRequestConfig {
    token ?: string
}   

type TClientFunction = ( endpoint: string , config: ClientConfig  ) => Promise<any>

const client = (
    endpoint : string, 
    { data , token, headers : customHeaders, ...customConfig } : ClientConfig
) => {
    return api({
        ...customConfig,
        url: endpoint,
        data,
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders
        }
    })
    .then( async response => {
        if(response.status === 401) {
            await auth.logout();
            return Promise.reject({ message: 'Please reauthenticate'})
        }
        const data = response.data;
        //TODO: validate response ok
        return data;
    })
}



export { client, TClientFunction }