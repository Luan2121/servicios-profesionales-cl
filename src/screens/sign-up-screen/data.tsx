import { Comuna, City } from '@types';
import * as Yup from 'yup';

export type FormType = {
    rut: string,
    email: string,
    password: string,
    user: string,
    city: undefined | City,
    phone: string,
    comuna: undefined | Comuna,
    giro: string;
}

const formInitialValues : FormType = {
    rut: '',
    email: '',
    password: '',
    city: undefined,
    comuna: undefined,
    phone: '',
    giro: '',
    user: ''

};

const formValidation = Yup.object().shape({
    rut: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email("Introduzca un email valido").required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
    city: Yup.object().shape({
        id: Yup.string().required()
    }).required("Seleccione una ciudad"),
    phone: Yup.string().required("Campo obligatorio")
});

export { formInitialValues, formValidation };