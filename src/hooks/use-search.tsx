import { useCallback, useEffect, useMemo, useState } from "react"

type SearchResult = [
    any[],
    {
        value: string,
        onTextChange: ( text : string ) => void
    }
];

const useSearch = ( data : any[] ) : SearchResult => {
    const [ value, setValue ] = useState("");
    const [ results, setResults ] = useState(data);

    useEffect( () => {
        if(data && data.length ){
            setResults(data);
        }
    } , [ ...(data || []).map( d => d.id ) ] );

    const onTextChange = useCallback( (text) => {
        setValue(text);
        let newResults = data.filter( d => d?.name.toLowerCase().indexOf( text.toLowerCase() ) > -1 )
        if(!text){
            setResults(data);
        }else {
            setResults(newResults);
        }
    } , [ setResults, ...(data || []).map( d => d.id )  ]);

    const searchProps = useMemo( () => ({
        value,
        onTextChange
    }) , [value,onTextChange]);

    return [ results, searchProps ];
}

export { useSearch };