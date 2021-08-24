import { Dispatch, useCallback, useLayoutEffect, useReducer, useRef } from "react";
import { useQuery } from "react-query";

interface State {
    status : 'idle' | 'rejected' | 'pending' | 'success' | 'resolved',
    data : any,
    error : any 
}

const defaultInitialState : State = {
    status: 'idle',
    data: null,
    error: null
}
const useSafeDispatch = <T>( dispatch : Dispatch<T> ) : Dispatch<T> => {
    const mounted = useRef(false);

    useLayoutEffect( () => {
        mounted.current = true;
        return () => { mounted.current = false };
    }, []);

    return useCallback(
        (state : T) => (mounted.current ? dispatch(state) : void 0 ),
        [dispatch]
    );
}

const useAsync = ( initialState ?: State  ) => {
    const initialStateRef = useRef({
        ...defaultInitialState,
        ...initialState
    });

    const [ { status, data, error } , setState ] = useReducer(
        ( state : State , action : any ) : State => ({...state,...action}),
        initialStateRef.current
    );
    
    const safeSetState = useSafeDispatch(setState);

    const setData = useCallback(
        ( data : State['data'] ) => safeSetState({ data, status: 'resolved' }),
        [safeSetState]
    );
    const setError = useCallback(
        ( error : State['error'] ) => safeSetState({ error , status: 'rejected'}),
        [safeSetState]
    );
    const reset = useCallback(
        () => safeSetState(initialStateRef.current),
        []
    );

    const run = useCallback(
        ( promise : Promise<any> ) => {
            if(!promise || !promise.then) {
                throw new Error(
                    'The argument passed to useAsync().run must be a promise'
                )
            }

            safeSetState({ status: 'pending' });

            return promise.then(
                data => {
                    setData(data)
                    return data;
                },
                error => {
                    setError(error);
                    return Promise.reject(error);
                },
            )
        },
        [ safeSetState , setData , setError ]
    );

    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}

export { useAsync };