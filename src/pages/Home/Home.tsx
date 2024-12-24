import styles from './Home.module.scss';

import { useContext, useEffect, useState } from 'react';

// Clients
import { DiscordClient } from '@service_clients/DiscordClient';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import OasisTeaser from '@components/OasisTeaser/OasisTeaser';

const discordClient = new DiscordClient();

export default function Home() {
    const { home } = useContext(CMSContext);

    return (
        <Page>
            <div 
                className={styles.container} 
            >

                <OasisTeaser />

                <div 
                    className={styles.background} 
                    style={{ backgroundImage: `url("${home.content?.background}")` }} 
                />
            </div>
        </Page>    
    );
}
