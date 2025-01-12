import styles from './DiscordEvent.module.scss';

import { useState } from 'react';

// Types
import { type DiscordEvent as DiscordEventType } from '@utils/discord';

// Components
import MultiToggle from '@components/MultiToggle/MultiToggle';
import Countdown from '@components/Countdown/Countdown';
import Text from '@components/Text/Text';
import OasisLocation from '@components/Location/OasisLocation/OasisLocation';

// Utils
import { getLocalTimeOnly, getServerTimeOnly } from '@utils/time';
import icon from '@utils/icon';

type Timezone = 'Local Time' | 'Server Time';

interface IDiscordEvent {
    event?: DiscordEventType;
}

export default function DiscordEvent({ event }: IDiscordEvent) {
    const [ timezone, setTimezone ] = useState<Timezone>('Local Time');

    return (
        <div className={styles.container}>
            <div className={styles.nextOpening}>
                <OasisLocation isCentered={true} />

                <div className={styles.countdown}>
                    <div className={styles.title}>
                        <Text>Next opening in:</Text>
                    </div>

                    <Countdown date={event?.raw_start_time} />

                    <div className={styles.date}>
                        <div className={styles.timeunit}>
                            <img src={icon.calendar} />
                            <Text>
                                {timezone === 'Local Time' 
                                    ? event?.local_start_time.time
                                    : event?.server_start_time
                                }
                            </Text>
                            </div>

                        <div className={styles.timeunit}>
                            <img src={icon.clock} />
                            <Text>
                                {timezone === 'Local Time' 
                                    ? `${getLocalTimeOnly(event?.raw_start_time)} - ${getLocalTimeOnly(event?.raw_end_time)}`
                                    : `${getServerTimeOnly(event?.raw_start_time)} - ${getServerTimeOnly(event?.raw_end_time) }`
                                }
                            </Text>
                        </div>

                        <div className={styles.timezone}>  
                            <MultiToggle 
                                options={['Local Time', 'Server Time']} 
                                initSelected='Local Time'
                                onSelect={(timezone: string) => {setTimezone(timezone as Timezone)}} 
                                activeColor='blue'
                                size='xs' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}