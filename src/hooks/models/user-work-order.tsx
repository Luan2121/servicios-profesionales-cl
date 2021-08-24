import { useMutation } from "react-query";
import { useClient } from "../use-client";
import { useAuth } from "../use-auth";
import { Comuna, Service, SubService } from "@types";

type useCreateWorkOrderParams = {
    date: string,
    hour: string,
    description: string,
    comuna: Comuna | null,
    service: Service | null,
    subService: SubService | null,
    value: number,
    modality: 'Visita Evaluativa' | 'Presupuesto Online',
}

const useCreateWorkOrder = () => {
    const client = useClient();
    const { user } = useAuth();
    return useMutation(
        ({ 
            date, 
            hour , 
            description,
            comuna,
            service,
            subService,
            value,
            modality
        } : useCreateWorkOrderParams) => client("",{
            method: 'POST',
            data: {
                "op":"actualizarDatos",
                "nombre": user?.username,
                "rut": user?.rut,
                "dv": user?.dv,
                "fecha": date,
                "hora": hour,
                "descipcion": description,
                "arr_datos": {
                    "nombre":user?.username,
                    "rut":user?.rut,
                    "dv":user?.dv,
                    "fecha":date,
                    "hora":hour,
                    "descipcion": description,
                    "add": {
                        "comuna": comuna?.id,
                        "idr": service?.id,
                        "idsr": subService?.id,
                        "precio": value,
                        "tipo": modality === "Presupuesto Online" ? 0 : 1
                    }
                }
            }
        })
    )
};

export { useCreateWorkOrder };