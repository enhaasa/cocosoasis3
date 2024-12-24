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
                <Text>Next opening in:</Text>
                <Countdown date={event?.raw_start_time} />
            </div>
        </div>    
    );
}
