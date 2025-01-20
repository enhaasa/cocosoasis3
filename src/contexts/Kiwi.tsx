/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Clients
import { KiwiClient } from '@service_clients/KiwiClient';

// Hooks
import useRealm, { UseRealm } from '@hooks/kiwi/useRealm';
import useMenu, { UseMenu } from '@hooks/kiwi/useMenu';
import useStaff, { UseStaff } from '@hooks/kiwi/useStaff';
import useSeatings, { UseSeatings } from '@hooks/kiwi/useSeatings';

export interface IKiwiContext {
    realm: UseRealm;
    menu: UseMenu;
    staff: UseStaff;
    seatings: UseSeatings;
}

const KiwiContext = createContext<IKiwiContext>({} as IKiwiContext);
const client = new KiwiClient();

function KiwiContextProvider({ children }: any) {
    const realm = useRealm(client);
    const menu = useMenu(client);
    const staff = useStaff(client);
    const seatings = useSeatings(client);

    return (
        <KiwiContext.Provider value={{
            realm,
            menu,
            staff,
            seatings
        }}>
            {children}
        </KiwiContext.Provider>
    )
}

export { KiwiContextProvider, KiwiContext };