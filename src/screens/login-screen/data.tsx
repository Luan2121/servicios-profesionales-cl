import * as Yup from 'yup';

type FormType = {
    email : string,
    password : string
}

const formInitialValues : FormType = {
    email: '',
    password: ''
}

const formValidation = Yup.object().shape({
    email: Yup.string().email().required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio")
})

export { formInitialValues, formValidation, FormType };