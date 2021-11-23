import { CameraCapturedPicture } from "expo-camera";
import { ImagePickerResult } from "expo-image-picker";
import { useMutation } from "react-query"
import { useClient } from "./use-client"
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { v4 as uuid } from 'uuid';
import { Platform } from "react-native";

type UseStorePhotoType = {
    orderId: string,
    technicianId: string,
    userId?: string,
    type?: string,
    photo: ImagePickerResult | CameraCapturedPicture
}

const useStorePhoto = () => {
    const client = useClient();
    return useMutation( 
        async ({ orderId, technicianId, userId, type, photo } : UseStorePhotoType  ) => {
            const form = new FormData();
            form.append("iidot",orderId);
            form.append("iidprestador",technicianId);
            form.append("idusuariox",userId || "1");
            form.append("iidtipo","1");
            form.append("imagen", JSON.stringify({
                name: `foto-${uuid()}`,
                type: ( photo as ImageInfo ).type || "image/jpeg",
                uri:
                  Platform.OS === "android" ? ( photo as ImageInfo ).uri : (photo as ImageInfo).uri.replace("file://", "")
            }));
            const result = await client("rutinas/SqlOt.php?op=guardarFotoFinal",{
                data: form,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log({ result });
            return null;
        }
    );
}

export { useStorePhoto };