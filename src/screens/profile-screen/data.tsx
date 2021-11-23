import { Comuna, City, User } from '@types';
import * as Yup from 'yup';

export type FormType = {
    rut: string,
    email: string,
    password?: string,
    user: string,
    city: undefined | City,
    phone: string,
    comuna: undefined | Comuna,
    giro: string,
    id: string
}

const formInitialValues = (user ?: User) : FormType => ({
    rut: '',
    email: user?.email || '',
    password: '',
    city: undefined,
    comuna: undefined,
    phone: '',
    giro: '',
    user: '',
    id: user?.id || user?.rut || ""
});

const formValidation = Yup.object().shape({
    rut: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email("Introduzca un email valido").required("Campo obligatorio"),
    city: Yup.object().shape({
        id: Yup.string().required()
    }).required("Seleccione una ciudad"),
    phone: Yup.string().required("Campo obligatorio")
});

export { formInitialValues, formValidation };