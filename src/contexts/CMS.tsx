/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

// Hooks
import useHome, { IUseHome } from '@hooks/cms/useHome';
import useVenue, { IUseVenue } from '@hooks/cms/useVenue';
import useServices, { IUseServices } from '@hooks/cms/useServices';
import useBookings, { IUseBookings } from '@hooks/cms/useBookings';
import useMenu, { IUseMenu } from '@hooks/cms/useMenu';
import usePartners, { IUsePartners } from '@hooks/cms/usePartners';

export interface ICMSContext {
    home: IUseHome;
    about: IUseVenue;
    services: IUseServices;
    bookings: IUseBookings;
    partners: IUsePartners;
    menu: IUseMenu;
    components: any;
    assets: any;
}

const CMSContext = createContext<ICMSContext>({} as ICMSContext);
const client = new ContentfulClient();

const pagesToFetch: any = {
    landingPage: 'landingPage',
    servicesPage: 'servicesPage',
    menuPage: 'menuPage',
    venuePage: 'aboutPage',
    partnersPage: 'partnersPage'
};

function CMSContextProvider({ children }: any) {
    const [ assets, setAssets ] = useState(null);
    const [ components, setComponents ] = useState(null);
    const [ pages, setPages ] = useState(_copyNullValuedObject(pagesToFetch));

    useEffect(() => {
        client.getEntries(Object.values(pagesToFetch).filter(e => e !== '').join(',')).then(result => {
            const newAssets: any = {};
            const newComponents: any = {};
            const newPages: any = {};

            result.includes.Asset.forEach((asset: any) => (
                newAssets[asset.sys.id] = { 
                    ...asset.fields, 
                    file: { ...asset.fields.file, url: `https:${asset.fields.file.url}` } 
                }
            ));
            
            Object.keys(pagesToFetch).forEach(page => {
                const resultEntryIndex = result.items.findIndex((entry: any) => {
                    return entry && entry.sys.contentType.sys.id === pagesToFetch[page];
                });
            
                if (resultEntryIndex !== -1) {
                    newPages[page] = result.items[resultEntryIndex];
                    result.items.splice(resultEntryIndex, 1); 
                }
            });

            if (result.includes?.Entry) {
                result.includes?.Entry.forEach((item: any) => {
                    if (item) {
                        newComponents[item.sys.id] = item.fields;
                    }
                });
            }

            setAssets(newAssets);
            setComponents(newComponents);
            setPages(newPages);
        });
    }, []);

    const home = useHome(pages.landingPage, assets);
    const about = useVenue(pages.venuePage, assets, components);
    const services = useServices(pages.servicesPage, assets, components);
    const bookings = useBookings(pages.bookingsPage);
    const partners = usePartners(pages.partnersPage, assets, components);
    const menu = useMenu(pages.menuPage, assets);

    return (
        <CMSContext.Provider value={{
            assets: assets,
            components,
            home,
            about,
            services,
            bookings,
            partners,
            menu
        }}>
            {children}
        </CMSContext.Provider>
    )
}

function _copyNullValuedObject(obj: any) {
    const newObj: any = {};
    Object.keys(obj).forEach((key: string) => newObj[key] = null);

    return newObj;
}

export { CMSContextProvider, CMSContext };