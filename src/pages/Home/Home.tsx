import styles from './Home.module.scss';

import { useContext, useEffect, useState } from 'react';

// Clients
import { DiscordClient } from '@service_clients/DiscordClient';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import DiscordEvent from '@components/DiscordEvent/DiscordEvent';

// Types
import { type DiscordEvent as DiscordEventType } from '@utils/discord';

// Utils
import { sortEventsByDate, convertEvents } from '@utils/discord';

const discordClient = new DiscordClient();

export default function Home() {
    const { home } = useContext(CMSContext);
    const [ nextDiscordEvent, setNextDiscordEvent ] = useState<DiscordEventType | undefined>(undefined);

    useEffect(() => {
        discordClient.getEvents().then((result) => {
            const events = convertEvents(sortEventsByDate(result));

            setNextDiscordEvent(events[0]);
        })
    }, []);

    return (
        <Page>
            <div 
                className={styles.container} 
            >

                <DiscordEvent event={nextDiscordEvent} />

                <div 
                    className={styles.background} 
                    style={{ backgroundImage: `url("${home.content?.background}")` }} 
                />
            </div>
        </Page>    
    );
}
