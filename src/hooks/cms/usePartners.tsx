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
    partnerCategories: {
        headline: string;
        items: Partner[];
    }[]
    communities: Partner[],
    background?: string;
}

export interface IUsePartners {
    content: null | PartnersContent;
}

export default function usePartners(page: any, assets: any, components: any) {
    const [ content, setContent ] = useState<null | PartnersContent>(null);
    const isLoaded = useRef<boolean>(false);

    function parsePartner(partner: any, components: any, assets: any) {
        return {
            ...partner,
            flags: partner?.flags?.map((flag: any) => components[flag?.sys?.id]) ?? [],
            logo: assets[partner?.logo?.sys?.id]?.file?.url ?? ''
        }
    }

    useEffect(() => {
        if (isLoaded.current || !page?.fields) return;
        
        const { fields } = page;

        const parsedCommunities = [ ...fields?.communities ?? [] ];
        const parsedCategories = [ ...fields?.partnerCategories ?? [] ];

        parsedCategories.forEach((category: any, index: number) => {
            const categoryComponent = components[category?.sys?.id];

            parsedCategories[index] = {
                ...categoryComponent,
                items: categoryComponent.items.map((item: any) => parsePartner(components[item?.sys?.id], components, assets) as Partner)
            }
        });

        parsedCommunities.forEach((partner: any, index: number) => {
            const partnerComponent = components[partner?.sys?.id];

            parsedCommunities[index] = {
                ...partnerComponent ?? {},
                flags: partnerComponent?.flags?.map((flag: any) => components[flag?.sys?.id]) ?? [],
                logo: assets[components[partner?.sys?.id]?.logo?.sys.id]?.file?.url ?? ''
            }
        });

        setContent({
            partnerCategories: parsedCategories,
            communities: parsedCommunities,
            background: assets[fields.background?.sys?.id]?.file?.url
        });

    }, [ page ]);

    return {
        content
    }
}

