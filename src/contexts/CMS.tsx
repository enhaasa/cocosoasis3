/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';

// Clients
import { ContentfulClient } from '@service_clients/ContentfulClient';

// Hooks
import useHome, { IUseHome } from '@hooks/cms/useHome';
import useVenue, { IUseVenue } from '@hooks/cms/useVenue';
import useServices, { IUseServices } from '@hooks/cms/useServices';
import useReservations, { IUseReservations } from '@hooks/cms/useReservations';
import useMenu, { IUseMenu } from '@hooks/cms/useMenu';
import usePartners, { IUsePartners } from '@hooks/cms/usePartners';

// Types
import type { Event } from '@pages/Event/EventResult/EventResult';

// Utils
import { 
    convertToLocalTimezone,
    convertToServerTimezone,
    LocalTimezone
} from '@utils/time';

export type ContentfulEvent = Event & {
    local_start_time: LocalTimezone,
    local_end_time: LocalTimezone,
    server_start_time: string,
    server_end_time: string,
    raw_start_time: string,
    raw_end_time: string,
}

export interface ICMSContext {
    home: IUseHome;
    about: IUseVenue;
    services: IUseServices;
    reservations: IUseReservations;
    partners: IUsePartners;
    menu: IUseMenu;
    components: any;
    assets: any;
    events: null | ContentfulEvent[];
}

const CMSContext = createContext<ICMSContext>({} as ICMSContext);
const client = new ContentfulClient();

const pagesToFetch: any = {
    landingPage: 'landingPage',
    servicesPage: 'servicesPage',
    menuPage: 'menuPage',
    venuePage: 'aboutPage',
    partnersPage: 'partnersPage',
    reservationsPage: 'reservationsPage'
};

function CMSContextProvider({ children }: any) {
    const [ events, setEvents ] = useState(null);
    const [ assets, setAssets ] = useState(null);
    const [ components, setComponents ] = useState(null);
    const [ pages, setPages ] = useState(_copyNullValuedObject(pagesToFetch));

    useEffect(() => {
        client.getEntries(Object.values(pagesToFetch).filter(e => e !== '').join(',')).then(result => {
            const newEvents: any = [];
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

            // Probably components
            if (result.includes?.Entry) {
                result.includes?.Entry.forEach((item: any) => {
                    if (item) {
                        newComponents[item.sys.id] = item.fields;
                    }
                });
            }

            // Probably events
            if (result.items) {
                sortEventsByDate(result.items).forEach((item: any) => {
                    if (item) {
                        newEvents.push({
                            ...formatCmsEvent(item.fields),
                            background: newAssets[item?.fields?.background?.sys?.id]?.file?.url
                        });
                    }
                })
            }

            setAssets(newAssets);
            setComponents(newComponents);
            setPages(newPages);
            setEvents(newEvents);
        });
    }, []);

    const home = useHome(pages.landingPage, assets);
    const about = useVenue(pages.venuePage, assets, components);
    const services = useServices(pages.servicesPage, assets, components);
    const reservations = useReservations(pages.reservationsPage, assets);
    const partners = usePartners(pages.partnersPage, assets, components);
    const menu = useMenu(pages.menuPage, assets);

    return (
        <CMSContext.Provider value={{
            assets: assets,
            components,
            home,
            about,
            services,
            reservations,
            partners,
            menu,
            events,
        }}>
            {children}
        </CMSContext.Provider>
    )
}

function sortEventsByDate(events: any): Event[] {
    const sortedEvents = events.sort((a: any, b: any) => 
        new Date(a.fields.startTime).getTime() - new Date(b.fields.startTime).getTime()
    );

    return sortedEvents;
}

function _copyNullValuedObject(obj: any) {
    const newObj: any = {};
    Object.keys(obj).forEach((key: string) => newObj[key] = null);

    return newObj;
}

function formatCmsEvent(event: Event): ContentfulEvent {
    
    const formattedEvent = {
        ...event,
        local_start_time: convertToLocalTimezone(event.startTime),
        local_end_time: convertToLocalTimezone(event.endTime),
        server_start_time: convertToServerTimezone(event.startTime),
        server_end_time: convertToServerTimezone(event.endTime),
        raw_start_time: event.startTime,
        raw_end_time: event.endTime,
    }

    return formattedEvent;
}

export { CMSContextProvider, CMSContext };