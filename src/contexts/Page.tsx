/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react';

// Hooks
import useNavigation, { IUseNavigation } from './../hooks/useNavigation';
import useStoredEvents, { IUseStoredEvents } from '@hooks/useStoredEvents';
import useSingleInteractions, { IUseSingleInteractions } from '@hooks/useSingleInteractions';

// Types
import { ContentfulEvent } from '@contexts/CMS';

export interface IUIContext {
    navigator: IUseNavigation;
    storedEvents: IUseStoredEvents;
    singleInteractions: IUseSingleInteractions;
    contentfulEvent: null | ContentfulEvent;
    setContentfulEvent: React.Dispatch<React.SetStateAction<ContentfulEvent | null>>;
}

const PageContext = createContext<IUIContext>({} as IUIContext);

function PageContextProvider({ children }: any) {
    const navigator = useNavigation();
    const storedEvents = useStoredEvents();
    const [ contentfulEvent, setContentfulEvent ] = useState<null | ContentfulEvent>(null);
    const singleInteractions = useSingleInteractions();

    return (
        <PageContext.Provider value={{
            navigator,
            storedEvents,
            singleInteractions,
            contentfulEvent,
            setContentfulEvent
        }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageContextProvider, PageContext };