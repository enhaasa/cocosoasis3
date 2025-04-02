/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

// types
import { Document } from '@contentful/rich-text-types';

export type Partner = {
    name: string;
    address?: string;
    description?: Document;
    logo: string;
    flags: Flag[];
    websiteLink: string;
    discordLink: string;
}

type Flag = {
    title: string;
    color: string;
}

export type PartnersContent = {
    partners: Partner[],
    communities: Partner[],
    background?: string;
}

export interface IUsePartners {
    content: null | PartnersContent;
}

export default function usePartners(page: any, assets: any, components: any) {
   const [ content, setContent ] = useState<null | PartnersContent>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        const parsedPartners = [ ...fields?.partners ?? [] ];
        const parsedCommunities = [ ...fields?.communities ?? [] ];

        parsedPartners.forEach((partner: any, index: number) => {
            const partnerComponent = components[partner.sys.id];

            parsedPartners[index] = {
                ...partnerComponent ?? {},
                flags: partnerComponent?.flags?.map((flag: any) => components[flag?.sys?.id]) ?? [],
                logo: assets[components[partner.sys.id]?.logo?.sys.id]?.file?.url ?? ''
            }
        });

        parsedCommunities.forEach((partner: any, index: number) => {
            const partnerComponent = components[partner.sys.id];

            parsedCommunities[index] = {
                ...partnerComponent ?? {},
                flags: partnerComponent?.flags?.map((flag: any) => components[flag?.sys?.id]) ?? [],
                logo: assets[components[partner.sys.id]?.logo?.sys.id]?.file?.url ?? ''
            }
        });

        setContent({
            partners: parsedPartners,
            communities: parsedCommunities,
            background: assets[fields.background?.sys?.id]?.file?.url
        });

    }, [ page ]);

    return {
        content
    }
}

