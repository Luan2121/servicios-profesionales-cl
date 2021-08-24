import * as Yup from 'yup';

export type FormType = {
    //rut: string,
    email: string,
    phone: string,
    user: string,
}

const formInitialValues : FormType = {
    email: '',
    phone: '',
    user: ''
};

const formValidation = Yup.object().shape({
    //rut: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email("Introduzca un email valido").required("Campo obligatorio"),
    phone: Yup.string().required("Campo obligatorio"),
    user: Yup.string().required("Campo obligatorio")
});

export { formInitialValues, formValidation };