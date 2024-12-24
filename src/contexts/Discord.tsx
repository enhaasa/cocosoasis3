/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

// Clients
import { DiscordClient } from '@service_clients/DiscordClient';

// Hooks
import useDiscord, { IUseDiscord} from '@hooks/discord/useDiscord';

export interface IDiscordContext {
    data: IUseDiscord;
}

const DiscordContext = createContext<IDiscordContext>({} as IDiscordContext);
const client = new DiscordClient();

function DiscordContextProvider({ children }: any) {
   const data = useDiscord(client);

    return (
        <DiscordContext.Provider value={{
            data
        }}>
            {children}
        </DiscordContext.Provider>
    )
}

export { DiscordContextProvider, DiscordContext };