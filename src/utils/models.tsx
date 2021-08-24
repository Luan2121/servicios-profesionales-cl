import { Assets } from "@assets";
import { 
    City, 
    Comuna, 
    Service, 
    Direction, 
    Message,
    OrderItem
} from "@types";

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
    createOrdersFromResponse
}