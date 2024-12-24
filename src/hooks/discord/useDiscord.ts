import { useState, useEffect } from "react";

// Types
import { DiscordClient } from "@service_clients/DiscordClient";
import { type DiscordEvent as DiscordEventType } from '@utils/discord';

// Utils
import { sortEventsByDate, convertEvents } from '@utils/discord';

export type IUseDiscord = { nextDiscordEvent?: DiscordEventType };

export default function useDiscord(client: DiscordClient) {
    const [ nextDiscordEvent, setNextDiscordEvent ] = useState<DiscordEventType | undefined>(undefined);

    useEffect(() => {
        client.getEvents().then((result) => {
            const events = convertEvents(sortEventsByDate(result));

            setNextDiscordEvent(events[0]);
        });
    }, [client]);

    return { nextDiscordEvent }
}