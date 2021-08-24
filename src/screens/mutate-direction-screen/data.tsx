import { LatLng } from 'react-native-maps';
import * as Yup from 'yup';

type FormType = {
    address : string,
    apartment : string,
    street: string,
    streetNumber: string,
    coordinate: LatLng | null
}

const formInitialValues : FormType = {
    address: '',
    apartment : '',
    street: '',
    streetNumber: '',
    coordinate: null
}

const formValudation = Yup.object().shape({
    address: Yup.string().required("Campo obligatorio")
});

export { formInitialValues, formValudation, FormType };