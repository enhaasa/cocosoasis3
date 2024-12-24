import styles from './OasisTeaser.module.scss';

import { useContext } from 'react';

// Contexts
import { DiscordContext } from '@contexts/Discord';
import { PageContext } from '@contexts/Page';

// Components
import DiscordEvent from '@components/DiscordEvent/DiscordEvent';
import Button from '@components/Button/Button';

export default function OasisTeaser() {
    const discord = useContext(DiscordContext);
    const { navigator } = useContext(PageContext);

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                <div className={styles.nextEvent}>
                    <DiscordEvent event={discord.data.nextDiscordEvent} />
                </div>

                <nav className={styles.nav}>
                    <Button 
                        name='Info & Location' 
                        onClick={() => navigator.internalNavigate('/about')} 
                        style='neutral'
                    />

                    <Button 
                        name='Reservations' 
                        onClick={() => navigator.internalNavigate('/reservations')} 
                        style='accent'
                    />

                </nav>
            </div>

        </div>    
    );
}
