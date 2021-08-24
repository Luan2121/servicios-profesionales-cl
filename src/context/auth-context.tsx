import React , { createContext, useCallback, useEffect, useMemo } from "react";
import { useAsync } from "../hooks/use-async";
import { FormType } from "@screens/sign-up-screen/data";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from "../auth-provider";
import { User } from '@types';

interface AuthContextType {
    login : ( form : any ) => Promise<void>,
    logout : () => Promise<void>,
    register : ( form : any ) => Promise<void>,
    user ?: User
}

const bootstrapAppData = async () => {
    try{
        const storedUser = await AsyncStorage.getItem(
            auth.userKey
        );
        if( storedUser ) {
            const user : User = JSON.parse(storedUser);
            return user;
        }
        return null;
    }catch(err){
        return null;
    }
}

const AuthContext = createContext<AuthContextType>({
    login: async ( form ) => {},
    logout: async () => {},
    register: async ( form ) => {},
});
AuthContext.displayName = 'AuthContext';

const AuthProvider = ( props : any ) => {
    const {
        data : user,
        status,
        error,
        isLoading,
        isIdle,
        isSuccess,
        isError,
        run,
        setData
    } = useAsync();

    useEffect( () => {
        run( bootstrapAppData() );
    } , [run])

    const login = useCallback(
        async form => {
            const user = await auth.login(form);
            if(!user){
                throw new Error("Usuario o clave invalida");
            }

            setData(user);
            return user;
        },
        [setData]
    );

    const register = useCallback(
        form => {
            return auth.register( getRegisterForm( form as FormType ) ).then( user => setData(user) )
        },
        [setData]
    );

    const logout = useCallback(
        () => {
            auth.logout();
            setData(null)
        } , [ setData ]
    );

    const value = useMemo(
        () => ({ login, logout, register, user }),
        [login,logout,register,user]
    );

    if( isLoading || isIdle ){
        //TODO: add splash screen
        return null;
    }

    if( isError ) {
        //TODO: add full page error screen
        return null;
    }

    if( isSuccess ) {
        return <AuthContext.Provider value = {value} {...props} />
    }

    throw new Error(`Unhandled status: ${status}`);

}

const getRegisterForm = (form : FormType) => {
    return ({
        "op":"registroCliente",
		"cliente":{
			"username":form.user ,
			"rut": form.rut,
			"telefono": form.phone,
			"celular":"",
			"ciudad":{
				"iid": form.city?.id
			},
			"comuna":{
					"iidc": form.comuna?.id
			},
			"email": form.email,
			"giro": form.giro,
			"clave1": form.password,
			"direccion":"",
			"numero":"",
			"dpto":""
		}
    })
}

export { AuthProvider, AuthContext };