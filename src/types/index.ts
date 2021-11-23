import { ImageSourcePropType } from "react-native";
import { InputProps, FieldWrapperProps } from 'bumbag-native';

interface Service {
    id: string,
    name: string,
    price: number,
    isActive: boolean,
    image?: ImageSourcePropType,
    subServices : SubService[]
}

interface FormikFieldProps extends Pick<InputProps,'placeholder' | 'size' > , FieldWrapperProps {
    name : string
}

type City = {
    id : string,
    name: string
}

type Comuna = {
    id : string,
    name : string
}

type SubService = {
    id: string,
    name: string
}

type User = { 
    username: string,
    id: string,
    rut: string,
    email: string,
    giro?: string,
    phone: string,
    dv?: string,
    hasProfile: boolean,
    type: 'client' | 'technician'
}

type Direction = {
    id: string,
    address: string
}

type Message = {
    id: string,
    read: boolean,
    content: string,
    date: string
};

type PreOrder = {
    service: Service | null,
    subService: SubService | null,
    comuna: Comuna | null,
    modality: 'Visita Evaluativa' | 'Presupuesto Online',
    description: string,
    date: string,
    direction: Direction | null,
    value: number
}

type OrderItem = {
    name: string,
    id: string
}

type WebPayResult = {
    token: string,
    url: string
};

type HistoryItem = {
    user: string,
    site: string,
    date: string,
    action: string,
    actionType: 'Modificacion' | 'Presupuesto' | 'Creacion' | 'Asignacion Tecnico' | 'Default',
    actionIcon: {
        provider: string,
        icon: string
    }
}

type OrderDetail = {
    id: string,
    budget: string | null,
    status: 'En proceso' | 'Completado',
    description: string,
    technicianId: string,
    client: string,
    address: string,
    service: string,
    specialty: string,
    hour: string,
    manager: string,
    history: HistoryItem[]
}

type Tone = 'danger' | 'warning' | 'success' | 'info' | 'promote'

export { 
    Service, 
    City, 
    User,
    FormikFieldProps, 
    Direction,
    Comuna,
    PreOrder,
    SubService,
    WebPayResult,
    OrderItem,
    Message,
    OrderDetail,
    HistoryItem,
    Tone
};