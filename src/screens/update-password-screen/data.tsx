import * as Yup from 'yup';

type FormType = {
    password: string
}

const formInitialValues : FormType = {
    password: ''
};

const formValidation = Yup.object().shape({
    password: Yup.string().required("Campo obligatorio")
});

export { formInitialValues , formValidation };