import { SubService, Comuna, Direction } from '@types';
import * as Yup from 'yup';

type FormType = {
    subService: SubService | null,
    comuna: Comuna | null,
    modality: 'Visita Evaluativa' | 'Presupuesto Online' | '',
    description: string,
    date: string,
    direction: Direction | null
}

const formInitialValues : FormType = {
    subService: null,
    comuna: null,
    modality: '',
    description: '',
    date: '',
    direction: null
}

const formValidation = Yup.object().shape({
    serviceType: Yup.object().shape({
        id: Yup.string().required()
    }).required("Seleccione tipo de servicio"),
    comuna: Yup.object().shape({
        id: Yup.string().required()
    }).required("Seleccione comuna"),
    modality: Yup
        .string()
        .oneOf(['Visita Evaluativa','Presupuesto Online'])
        .required('Seleccione modalidad del servicio'),
    date: Yup.string().required("Debe elegir una fecha para su revision"),
    direction: Yup.object().required("Seleccione una direcci[on")
})

export { FormType, formInitialValues, formValidation };
