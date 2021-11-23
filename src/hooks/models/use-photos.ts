import { useClient } from "@hooks/use-client"
import { useMutation } from "react-query";

const useStorePhoto = () => {
    const client = useClient();

    return useMutation(
        () => client("", {
            data: {
                op: "guardarFotoFinal"
            },
            method: 'POST'
        })
    );
};

export { useStorePhoto };