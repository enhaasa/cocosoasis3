import styles from './OasisTeaser.module.scss';

import { useContext } from 'react';

// Contexts
import { DiscordContext } from '@contexts/Discord';
import { PageContext } from '@contexts/Page';
import { UIContext } from '@contexts/UI';

// Components
import DiscordEvent from '@components/DiscordEvent/DiscordEvent';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import Syncshell from '@components/Syncshell/Syncshell';

export default function OasisTeaser() {
    const discord = useContext(DiscordContext);
    const { navigator } = useContext(PageContext);
    const { modals } = useContext(UIContext);

    function handleSyncshellClick() {
        modals.add(
            <Modal headline='Syncshell' display='grid'>
                <div>
                    <Syncshell />
                </div>
            </Modal>
        );
    }

    return (
        <div className={styles.container}>
            
            <div className={styles.wrapper}>

                <div className={styles.nextEvent}>
                    <DiscordEvent event={discord.data.nextDiscordEvent} />
                </div>

                <nav className={styles.nav}>
                    <Button 
                        name='About' 
                        onClick={() => navigator.internalNavigate('/about')} 
                        style='neutral'
                    />

                    <Button name='Syncshell' onClick={handleSyncshellClick} />

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
