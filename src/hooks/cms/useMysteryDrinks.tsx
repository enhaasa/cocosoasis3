import { useState, useEffect, useRef } from 'react';

export interface IUseMysteryDrinks {
    content: any;
}

export default function useMysteryDrinks(page: any, assets: any, components: any) {
   const [ content, setContent ] = useState<null | any>(null);
   const isLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (isLoaded.current || !page) return;

        const { fields } = page;

        const parsedDrinks = [ ...fields?.drinks ?? [] ];

        parsedDrinks?.forEach((service: any, index: number) => {

            const backgroundId = components[service.sys.id]?.background?.sys?.id;

            parsedDrinks[index] = {
                ...components[service.sys.id],
                background: assets[backgroundId]?.file.url,
            };
        });

        setContent({
            headline: fields.headline,
            subline: fields.subline,
            drinks: parsedDrinks,
            background: assets[fields?.background?.sys?.id]?.file?.url,
        });
        
    }, [ page, assets, components ]);

    return {
        content
    }
}