import * as Yup from 'yup';

type BillType = {
    date: string,
    number: string,
    value: string | number,
}

type FormType = {
    paymentMethod: 'Abono' | 'Transferencia' | 'Deposito' | 'Credito' | 'Debito' | '',
    hasMagnetic: boolean,
    hasBilling: boolean,
    bill: BillType,
    valueWithIva: string | number,
    supplierRut?: string,
    description: string
};

const formInitialValues : FormType = {
    paymentMethod: '',
    hasMagnetic: false,
    hasBilling: false,
    bill: {
        date: '',
        number: '',
        value: '',
    },
    valueWithIva: '',
    supplierRut: '',
    description: ''
}

const formValidation = Yup.object().shape({
    
})

export { FormType, formInitialValues, formValidation };