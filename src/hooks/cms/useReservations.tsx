/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

// Types
import { Document } from '@contentful/rich-text-types';


export interface IUseReservations {
    content: null | ReservationsContent;
}

type ReservationsContent = {
    description: Document,
    lagoonTitle: {
        headline: string;
    },
    lagoonDescription: Document,
    background?: string;
}

export default function useReservations(page: any, assets: any) {
   const [ content, setContent ] = useState<null | ReservationsContent>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        setContent({
            description: fields.description
            ,
            lagoonTitle: {
                headline: fields.lagoonHeadline,
            },
            lagoonDescription: fields.lagoonDescription,
            background: assets[fields.background?.sys.id]?.file?.url
        });

    }, [ page ]);

    return {
        content
    }
}

