import { useClient } from "../use-client";
import { useMutation } from "react-query"

type AddPaymentMutation = {
    orderId: string,
    paymentMethod: 'Abono' | 'Transferencia' | 'Deposito' | 'Credito' | 'Debito' | '',
    date: string,
    bill?: string,
    magnet?: string,
    value: string,
    rut: string,
    description: string
};

const useAddPayment = () => {
    const client = useClient();
    return useMutation(
        (values : AddPaymentMutation) => client("",{
            'method': 'POST',
            data: {
                "op":"addReporte",
                "idot": values.orderId,
                "rut": values.rut,
                "formapago": values.paymentMethod,
                "magnetico":"",
                "factura":"",
                "fecha":values.date,
                "rutproveedor":"",
                "valor":values.value,
                "valor_ingresos":"",
                "descripcion":values.description,
                "fechaadd":"",
                "facturaadd":"",
                "rutadd":"",
                "valoradd":""
            }
        })
    );
};

export { useAddPayment };