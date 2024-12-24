import styles from './OasisTeaser.module.scss';

import { useContext } from 'react';

// Contexts
import { DiscordContext } from '@contexts/Discord';

// Components
import DiscordEvent from '@components/DiscordEvent/DiscordEvent';

export default function OasisTeaser() {

    const discord = useContext(DiscordContext);

    return (
        <div className={styles.container}>
            <DiscordEvent event={discord.data.nextDiscordEvent} />
        </div>    
    );
}
