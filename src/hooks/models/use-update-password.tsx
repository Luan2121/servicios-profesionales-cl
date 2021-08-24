import { useClient } from "../use-client";
import { useMutation } from "react-query";
import { useAuth } from "@hooks/use-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userKey } from "../../auth-provider";

type UpdatePasswordType = {
    password: string,
    rut: string
}

type UpdateUserDataType = {
    email: string,
    phone: string,
    user: string,
    rut: string
};

const useUpdatePassword = () => {
    const client = useClient();
    return useMutation(
        (form : UpdatePasswordType) => client("", {
            method: 'POST',
            data: { 
                "op":"cambiarClave",
                "datArr":{
                    "clave0":form.password,
                    "clave1":form.password,
                    "clave2":form.password
                },
                "rut": form.rut
            }
        })
    );
}

const useUpdateUserData = () => {
    const client = useClient();
    const { user } = useAuth();
    return useMutation(
        ( form : UpdateUserDataType ) => client("", {
            method: 'POST',
            data: {
                "op":"actualizarDatos",
                "cli":{
                    "username": form.user,
                    "telefono": form.phone,
                    "celular": "",
                    "email": form.email
                },
                "rut": form.rut
            }
        }), {
            onSuccess: (data,variables) => {
                if( user ){
                    user.email = variables.email;
                    user.phone = variables.phone;
                    user.username = variables.user;

                    AsyncStorage.setItem(
                        userKey,
                        JSON.stringify(user)
                    );
                }
            }
        }
    )
};

export { useUpdatePassword , useUpdateUserData };