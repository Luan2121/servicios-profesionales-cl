import { Assets } from "@assets";
import { 
    City, 
    Comuna, 
    Service, 
    Direction, 
    Message,
    OrderItem,
    OrderDetail,
    HistoryItem
} from "@types";
import dayjs from "dayjs";


const createCitiesFromResponse = (data : any) : City[] => {
    if( Array.isArray(data) ){
        return data.map( city => ({ 
            id: city.iid, 
            name: city.descripcion 
        }))
    }
    throw new Error("data must be an array");
}

const createComunasFromResponse = (data : any[]) : Comuna[] => {
    if( Array.isArray(data) ){
        return data.map( comuna => ({ 
            id: comuna.iidc, 
            name: comuna.descripcionc
        }));
    }
    throw new Error("data must be an array");
}

const createServiceFromResponse = (data : any) : Service => {
    const rubro = data.resp[0];
    const service : Service = {
        id: rubro.idrubro,
        isActive: !!parseInt( rubro.rub_visibilidad ),
        name: rubro.rub_descripcion,
        image:  rubNameForImageAsset[ rubro.rub_descripcion.toLowerCase() ] ?? Assets.images.construction,
        subServices: data.subrubro.map( subrubro => ({
            id: subrubro.idsr,
            name: subrubro.sr_descripcion
        })),
        price: 0
    }
    return service;
}

const createDirectionsFromResponse = response => {
    const directions : Direction[] = response.arr_dirs.map(
        dir => ({
            id: dir.id,
            address: dir.name
        })
    );
    return directions
}

const createMessagesFromResponse = data => {
    if(data){
        const messagesArray = data.arr_mensajes;
        const messages : Message[] = messagesArray.map(
            m => ({
                date: m.fecha,
                id: m.id,
                read: Boolean( parseInt(m.leido) ),
                content: m.mensaje
            })
        );
        return messages;
    }   
    return [];
};

const createOrdersFromResponse = data => {
    if(data){
        const ordersArray = data.arr_ots;
        if( Array.isArray(ordersArray) ){
            const orders : OrderItem[] = ordersArray.map(
                o => ({
                    id: o.id,
                    name: o.name
                })
            );
            return orders;
        }
        return [];
    }
    return [];
}

const getActionType = (action : string) : [ HistoryItem['actionType'] , HistoryItem['actionIcon'] ] => {

    if( action.includes("Modificacion") ){
        return [ 'Modificacion', { provider: 'Feather', icon: 'edit' } ];
    }

    if( action.includes("Asigna Tecnico") ){
        return [ 'Asignacion Tecnico', { provider: 'AntDesign', icon: 'adduser' } ]
    }

    if( action.includes("Ingreso OT") ){
        return [ 'Creacion', { provider: 'Feather', icon: 'clock' } ];
    }

    return [ 'Default', { provider: 'MaterialCommunityIcons', icon: 'information-outline' } ];
}

const createOrderDetailFromResponse = ( data ) : OrderDetail | null => {
    if(data){
        const [ techinician , status, history ] = data.arr_audi.reduce( ( [t, s, hist] , h) => {
            if( h.accion.includes("Asigna Tecnico") ){
                const theTechnician = h.accion.split(" ")?.[2];
                t = theTechnician;
            }
            const [ actionType, actionIcon ] = getActionType(h.accion);
            const historyItem : HistoryItem = {
                user: ( h.usuario || "" ) as string,
                site: h.lugar,
                date: dayjs(h.fechahora).isValid() ? dayjs(h.fechahora).toISOString() : "",
                action: h.accion,
                actionType,
                actionIcon
            };
            const newHist = [...hist,historyItem];
            return [ t , s , newHist ];
        } , [ "" , "En proceso", [] ] );
        return ({
            id: data.arr_ot.idot,
            budget: data.arr_press?.length ? "#123456" : "",
            description: data.arr_ot.observacion,
            technicianId: techinician,
            status,
            client: "",
            address: "",
            service: "",
            specialty: "",
            hour: "",
            manager: "",
            history
        } as OrderDetail)
    }
    return null;
}

const createTechnicianOrderDetailFromResponse = (data) : OrderDetail | null => {
    if(data){
        const [ techinician , status, history ] = ( data.arr_audi || [] ).reduce( ( [t, s, hist] , h) => {
            if( h.accion.includes("Asigna Tecnico") ){
                const theTechnician = h.accion.split(" ")?.[2];
                t = theTechnician;
            }
            const [ actionType, actionIcon ] = getActionType(h.accion);
            const historyItem : HistoryItem = {
                user: ( h.usuario || "" ) as string,
                site: h.lugar,
                date: dayjs(h.fechahora).isValid() ? dayjs(h.fechahora).toISOString() : "",
                action: h.accion,
                actionType,
                actionIcon
            };
            const newHist = [...hist,historyItem];
            return [ t , s , newHist ];
        } , [ "" , "En proceso", [] ] );
        return ({
            id: data.arr_ot.id,
            budget: data.arr_press?.length ? "#123456" : "",
            description: data.arr_ot.nota,
            technicianId: techinician,
            status,
            history,
            client: data.arr_ot.cliente,
            address: data.arr_ot.direccion,
            service: data.arr_ot.rubro,
            specialty: data.arr_ot.especialidad,
            hour: data.arr_ot.hora,
            manager: data.arr_ot.encargado,
        } as OrderDetail)
    }
    return null;
}

const rubNameForImageAsset = {
    gasfiteria: Assets.images.gasfiter,
    electricidad: Assets.images.electricity,
    detecciones: Assets.images.inspection,
    consttruccion: Assets.images.construction,
    calefaccion: Assets.images.heating,
    ductoscopia: Assets.images.ductopia,
    destape: Assets.images.cleaning,
    techumbre: Assets.images.techumbre
}

export { 
    createCitiesFromResponse,
    createComunasFromResponse,
    createServiceFromResponse,
    createDirectionsFromResponse,
    createMessagesFromResponse,
    createOrdersFromResponse,
    createOrderDetailFromResponse,
    createTechnicianOrderDetailFromResponse
}