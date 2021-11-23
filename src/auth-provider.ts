import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_API_URL } from "@env";
import { User } from '@types';
import { FormType as LoginFormType } from "@screens/login-screen/data";

export const tokenKey = "__auth_servicios_profesionales_cl__";
export const userKey = "__AUTH_SERVICIOS_PROFESIONALES_CL__";

const getToken = async () => {
    return AsyncStorage.getItem(tokenKey)
}

/*const handleLoginResponse = async ({ user } : any) => {
    await AsyncStorage.setItem(tokenKey, user.token);
    return user;
}*/

const handleRegisterResponse = async (response : any) => {

    if( response.validacion === 'error'){
        return Promise.reject("Usuario o clave invalida");
    }
    const user : User = {
        username: response.username || "",
        id: response.id || "1",
        rut: response.rut || "" ,
        email: response.email || "",
        giro: response.giro || "",
        phone: response.telefono || "",
        hasProfile: !!response.rut,
        type: 'client'
    };
    await AsyncStorage.setItem(
        userKey,
        JSON.stringify(user)
    );
    return user;
}

const login = async ( data : any ) => {
    try{
        const loginResponse = await client('', getLoginForm(data) );
        const getClientResponse = await client('', getClientForm(loginResponse.rut) );

        if(loginResponse.validacion === "error"){
            return null;
        }

        const user : User = {
            type: data.userType,
            username: loginResponse.nombre,
            id: loginResponse.rut,
            rut: loginResponse.rut,
            dv: loginResponse.dv,
            email: getClientResponse.ret.cli_mail,
            phone: getClientResponse.ret.cli_telefono1,
            hasProfile: !!loginResponse.rut
        };
        await AsyncStorage.setItem(
            userKey,
            JSON.stringify(user)
        );
        return user;
    }catch( err ){
        console.log(err);
    }
}

const loginWithEmail = async ( data : any ) => {
    try{
        const loginResponse = await client('', getLoginWithEmailForm(data) );
        const user : User = {
            type: data.userType,
            username: loginResponse.nombre,
            id: loginResponse.rut,
            rut: loginResponse.rut,
            dv: loginResponse.dv,
            email: loginResponse.email,
            phone: "",
            hasProfile: !!loginResponse.rut && !!loginResponse.username
        };
        if(loginResponse.rut && loginResponse.username ){
            const getClientResponse = await client('', getClientForm(loginResponse.rut) );
            user.phone = getClientResponse.ret.cli_telefono1
        }
        if(loginResponse.validacion === "error"){
            return null;
        }
        await AsyncStorage.setItem(
            userKey,
            JSON.stringify(user)
        );
        return user;
    }catch( err ){
        console.log(err);
    }
}

const register = ( data : any ) => {
    return client('',data).then( handleRegisterResponse );
}

const registerWithEmail = ( data : any ) => {
    return client('',data).then( handleRegisterResponse );
}

const logout = async () => {
   await AsyncStorage.removeItem(tokenKey);
   await AsyncStorage.removeItem(userKey);
}

const client = async (endpoint : string, data : object ) => {
    return axios.post( endpoint, data, {
        baseURL: BASE_API_URL
    } ).then( response => {
        const { data } = response;
        return data;
    })
}

const getLoginForm = (form : any) => {
    return ({
        "op": form.userType === "client" ? "loginCliente" : "loginTecnico",
        "datLogin":{
            "rut": form.rut,
            "clave1": form.password
        }
    });
}

const getLoginWithEmailForm = (form : any) => {
    return ({
        "op": "login",
        "email": form.email,
        "password": form.password
    });
}

const getClientForm = (rut : string) => {
    return {
        "op":"getCliente",
	    "datRut": rut
    }
}

export { login , logout , register, getToken, registerWithEmail, loginWithEmail };