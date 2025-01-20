import { useState, useEffect } from "react";
import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { TSeating } from "@enhasa/kiwicore";

export type UseSeatings = {
    data: TSeating[] | null;
};

export default function useSeatings(client: KiwiClient) {
    const [ data, setData ] = useState<null | TSeating[]>(null);

    useEffect(() => {
        client.getSeatings().then(res => {
            setData(res);
        });
    }, []);
 
    return {
        data
    }
}
