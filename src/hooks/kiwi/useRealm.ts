import { useState, useEffect } from "react";
import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { TRealm } from "@enhasa/kiwicore";

export type UseRealm = {
    data: TRealm | null;
};

export default function useRealm(client: KiwiClient) {
    const [ data, setData ] = useState<null | TRealm>(null);

    useEffect(() => {
        client.getRealm().then(res => {
            setData(res);
        });
    }, []);
 
    return {
        data
    }
}
