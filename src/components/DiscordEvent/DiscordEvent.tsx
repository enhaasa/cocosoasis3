import styles from './DiscordEvent.module.scss';

// Types
import { type DiscordEvent as DiscordEventType } from '@utils/discord';

// Components
import Countdown from '@components/Countdown/Countdown';
import Text from '@components/Text/Text';

interface IDiscordEvent {
    event?: DiscordEventType;
}

export default function DiscordEvent({ event }: IDiscordEvent) {

    return (
        <div className={styles.container}>
            <div className={styles.nextOpening}>
                <div className={styles.title}>
                    <Text>Next opening in:</Text>
                </div>

                <Countdown date={event?.raw_start_time} />

                <div className={styles.date}>
                    <Text>{event?.local_start_time.time}</Text>

                    <div className={styles.timezone}>
                        <Text size='sm'>({event?.local_start_time.timezone})</Text>
                    </div>
                </div>
            </div>

            <div className={styles.location}>
                
            </div>
        </div>    
    );
}
