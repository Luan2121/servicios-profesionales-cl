import { useClient } from "@hooks/use-client";
import { FormType } from "@screens/mutate-report-screen/data";
import { useMutation } from "react-query"

interface UseMutateReportType extends FormType {
    orderId: string,
    userRut: string 
}

const useMutateReport = () => {
    const client = useClient();
    return useMutation(
        ( values : UseMutateReportType ) => client("", {
            data: {
                "op":"addReporte",
                "idot": values.orderId,
                "rut": values.userRut,
                "formapago": values.paymentMethod,
                "magnetico": values.hasMagnetic,
                "factura": values.bill.number,
                "fecha": values.bill.date,
                "rutproveedor":values.supplierRut,
                "valor":values.bill.value,
                "valor_ingresos":values.valueWithIva,
                "descripcion":values.description,
                "fechaadd":"",
                "facturaadd":"",
                "rutadd":"",
                "valoradd":""
            },
            method: 'POST'
        })
    );
}

export { useMutateReport };