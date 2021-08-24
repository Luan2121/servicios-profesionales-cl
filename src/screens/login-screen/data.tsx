import * as Yup from 'yup';

type FormType = {
    rut : string,
    password : string
}

const formInitialValues : FormType = {
    rut: '',
    password: ''
}

const formValidation = Yup.object().shape({
    rut: Yup.string().required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio")
})

export { formInitialValues, formValidation, FormType };