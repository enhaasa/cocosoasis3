/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Hooks
import useNavigation, { IUseNavigation } from './../hooks/useNavigation';
import useStoredEvents, { IUseStoredEvents } from '@hooks/useStoredEvents';
import useSingleInteractions, { IUseSingleInteractions } from '@hooks/useSingleInteractions';

export interface IUIContext {
    navigator: IUseNavigation;
    storedEvents: IUseStoredEvents;
    singleInteractions: IUseSingleInteractions;
}

const PageContext = createContext<IUIContext>({} as IUIContext);

function PageContextProvider({ children }: any) {
    const navigator = useNavigation();
    const storedEvents = useStoredEvents();
    const singleInteractions = useSingleInteractions();

    return (
        <PageContext.Provider value={{
            navigator,
            storedEvents,
            singleInteractions,
        }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageContextProvider, PageContext };