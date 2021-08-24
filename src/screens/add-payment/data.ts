import * as Yup from 'yup';

type FormType = {
    orderId: string,
    paymentMethod: 'Abono' | 'Transferencia' | 'Deposito' | 'Credito' | 'Debito' | '',
    date: string,
    bill?: string,
    magnet?: string,
    value: string,
    description: string
};

const formInitialValues : FormType = {
    orderId: '',
    paymentMethod: '',
    date: '',
    bill: '',
    magnet: '',
    value: '',
    description: ''
}

const formValidation = Yup.object().shape({
    orderId: Yup.string().required("Campo obligatorio")
})

export { FormType, formInitialValues, formValidation };