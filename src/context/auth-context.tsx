import React , { createContext, useCallback, useEffect, useMemo } from "react";
import { useAsync } from "../hooks/use-async";
import { FormType } from "@screens/sign-up-screen/data";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from "../auth-provider";
import { User } from '@types';

interface AuthContextType {
    login : ( form : any ) => Promise<void>,
    loginWithEmail : ( form : any ) => Promise<void>,
    logout : () => Promise<void>,
    register : ( form : any ) => Promise<void>,
    registerWithEmail : ( form : any ) => Promise<void>,
    user ?: User,
    isGuest: boolean,
    loginAsGuest: () => void
}

const bootstrapAppData = async () => {
    try{
        const storedUser = await AsyncStorage.getItem(
            auth.userKey
        );
        if( storedUser ) {
            const user : User = JSON.parse(storedUser);
            return [ user, false ];
        }
        return [ null, false ];
    }catch(err){
        return [ null, false ];
    }
}

const AuthContext = createContext<AuthContextType>({
    login: async ( form ) => {},
    loginWithEmail: async ( form ) => {},
    logout: async () => {},
    register: async ( form ) => {},
    registerWithEmail: async ( form ) => {},
    loginAsGuest: () => {},
    isGuest: false
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ( props : any ) => {
    const {
        data : authData,
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
    } , [run]);

    const login = useCallback(
        async form => {
            const user = await auth.login(form);
            if(!user){
                throw new Error("Usuario o clave invalida");
            }
            setData([ user, false ]);
            return user;
        },
        [setData]
    );

    const loginWithEmail = useCallback(
        async form => {
            const user = await auth.loginWithEmail(form);
            if(!user){
                throw new Error("Usuario o clave invalida");
            }
            setData([ user, false ]);
            return user;
        },
        [setData]
    );

    const loginAsGuest = useCallback(
        () => {
            setData( [ null , true ] );
        } , [setData]
    );

    const register = useCallback(
        form => {
            return auth.register( getRegisterForm( form as FormType ) ).then( user => setData([ user, false ]) )
        }, [setData]
    );

    const registerWithEmail = useCallback(
        form => {
            return auth.registerWithEmail( getRegisterWithEmailForm( form as FormType ) ).then( user => setData([ user, false ]) )
        }, [setData]
    );

    const logout = useCallback(
        () => {
            auth.logout();
            setData([ null , false ])
        } , [ setData ]
    );

    const value = useMemo(
        () => ({ loginWithEmail, registerWithEmail, login, logout, register, isGuest: authData?.[1], user: authData?.[0], loginAsGuest }),
        [loginWithEmail, login,logout,register, authData, loginAsGuest, registerWithEmail ]
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
        "op":"fillProfile",
		"client":{
            "id": form.id,
			"username":form.user ,
			"rut": form.rut,
			"telefono": form.phone,
			"celular":"",
			"ciudad":{
				"iidc": form.city?.id
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

const getRegisterWithEmailForm = (form : FormType) => {
    return ({
        "op":"register",
        "email": form.email,
        "password": form.password,
        "id": generateRandomId(8)
    })
}

const generateRandomId = (length : number) : string => {
    var text = '';
    var possible = '0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export { AuthProvider, AuthContext };