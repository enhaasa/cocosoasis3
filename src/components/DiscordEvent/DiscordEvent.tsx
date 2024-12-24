import styles from './DiscordEvent.module.scss';

// Types
import { type DiscordEvent as DiscordEventType } from '@utils/discord';

// Components
import Countdown from '@components/Countdown/Countdown';
import Text from '@components/Text/Text';
import Icon from '@components/Icon/Icon';

// Icons
import icon from '@utils/icon';

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

                <div className={styles.location}>
                    <Text> 
                        <Icon icon={icon.location} size='md' />  {event?.location} 
                    </Text>
                </div>
            </div>
        </div>    
    );
}
