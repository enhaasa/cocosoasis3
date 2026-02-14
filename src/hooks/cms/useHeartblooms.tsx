import { useState, useEffect, useRef } from 'react';

export interface IUseHeartblooms {
    content: any;
}

export default function useHeartblooms(page: any, assets: any, components: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page) return;

        const { fields } = page;

        const parsedFlowers = [ ...fields?.drinks ?? [] ];

        parsedFlowers?.forEach((service: any, index: number) => {

            const backgroundId = components[service.sys.id]?.background?.sys?.id;

            parsedFlowers[index] = {
                ...components[service.sys.id],
                background: assets[backgroundId]?.file.url,
            };
        });

        setContent({
            headline: fields.headline,
            subline: fields.subline,
            flowers: parsedFlowers,
            background: assets[fields?.background?.sys?.id]?.file?.url,
        });
        
    }, [ page, assets, components ]);

    return {
        content
    }
}