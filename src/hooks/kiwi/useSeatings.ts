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
};


export default function useSeatings(client: KiwiClient) {
    const [ data, setData ] = useState<null | Seating[]>(null);

    useEffect(() => {
        client.getSeatings().then(res => {
            setData(res.filter(seating => seating.section_name !== 'Bar'));
        });
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
 
    return {
        data,
        getSections,
        getSeatingsBySectionId
    }
}
