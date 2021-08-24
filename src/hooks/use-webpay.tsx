import { useMutation } from "react-query";
import { WebpayPlus } from 'transbank-sdk';
import { useEffect } from "react";

type UseWebPayParams = {
    sessionId: string,
    orderId: string,
    amount: number
};

const useWebPay = ({
    sessionId,
    orderId,
    amount
} : UseWebPayParams ) => {

    const mutation = useMutation(
        ({ sessionId, orderId, amount, redirectUrl } : any) => WebpayPlus.Transaction.create(
            orderId,
            sessionId,
            amount,
            redirectUrl
        )
    );

    useEffect( () => {
        mutation.mutate({
            sessionId,
            orderId,
            amount: 1530,
            redirectUrl: "http://transbank-rest-demo.herokuapp.com/webpay_plus/commit"
        })
    } , []);

    return {
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        data: mutation.data
    }
};

type useVerifyOrderStatus = {
    token: string
}

const useVerifyOrderStatus = () => {
    return useMutation(
        ({token} : useVerifyOrderStatus) => WebpayPlus.Transaction.status(token)
    );
}

export { useWebPay, useVerifyOrderStatus };