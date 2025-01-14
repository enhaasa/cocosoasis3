/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Clients
import { KiwiClient } from '@service_clients/KiwiClient';

// Hooks
import useRealm, { UseRealm } from '@hooks/kiwi/useRealm';
import useMenu, { UseMenu } from '@hooks/kiwi/useMenu';
import useStaff, { UseStaff } from '@hooks/kiwi/useStaff';

export interface IKiwiContext {
    realm: UseRealm;
    menu: UseMenu;
    staff: UseStaff;
}

const KiwiContext = createContext<IKiwiContext>({} as IKiwiContext);
const client = new KiwiClient();

function KiwiContextProvider({ children }: any) {
    const realm = useRealm(client);
    const menu = useMenu(client);
    const staff = useStaff(client);

    return (
        <KiwiContext.Provider value={{
            realm,
            menu,
            staff
        }}>
            {children}
        </KiwiContext.Provider>
    )
}

export { KiwiContextProvider, KiwiContext };