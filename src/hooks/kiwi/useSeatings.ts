import { useState, useEffect } from "react";
import { KiwiClient } from "@service_clients/KiwiClient";

// Types
import { type Seating } from "@service_clients/KiwiClient";

export type Section = {
    id: number;
    image_url: string;
    name: string;
}

export type UseSeatings = {
    data: Seating[] | null;
    getSections: () => Section[];
    getSeatingsBySectionId: (id: number) => Seating[];
    refresh: () => void;
    isLoading: boolean;
    lastRefreshed: number;
};


export default function useSeatings(client: KiwiClient) {
    const [ data, setData ] = useState<null | Seating[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ lastRefreshed, setLastRefreshed ] = useState<number>(0);

    useEffect(() => {
        refresh();
    }, []);

    function getSections() {
        const sections: Section[] = [];

        data?.forEach(seating => {
            let exists = sections.find(s => s.id === seating.section_id);

            if (!exists) {
                sections.push({
                    id: seating.section_id,
                    image_url: seating.image_url,
                    name: seating.section_name
                });
            }
        });

        return sections;
    }

    function getSeatingsBySectionId(id: number) {
        return data?.filter(seating => seating.section_id === id) ?? [];
    }

    function refresh() {
        setIsLoading(true);
        client.getSeatings().then(res => {
            setData(res.filter(seating => seating.section_name !== 'Bar'));
            setLastRefreshed((new Date).getTime());
            setIsLoading(false);
        });
    }
 
    return {
        data,
        getSections,
        getSeatingsBySectionId,
        refresh,
        isLoading,
        lastRefreshed
    }
}
