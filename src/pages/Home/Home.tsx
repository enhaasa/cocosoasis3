import styles from './Home.module.scss';

import { useContext, useLayoutEffect } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { PageContext } from '@contexts/Page';
import { DiscordContext } from '@contexts/Discord';

// Components
import Page from '@components/Page/Page';
import Event from '@pages/Event/Event';
import OasisTeaser from '@components/OasisTeaser/OasisTeaser';
import StartScreen from '@components/StartScreen/StartScreen';

const START_SCREEN_DURATION = 3000;

export default function Home() {
    const { home } = useContext(CMSContext);
    const { events } = useContext(CMSContext);
    const discord = useContext(DiscordContext);
    const { singleInteractions, contentfulEvent, setContentfulEvent } = useContext(PageContext);

    useLayoutEffect(() => {
        if (contentfulEvent) {
            return;
        }

        const nextDiscordEvent = discord.data.nextDiscordEvent;
        const nextContentfulEvent = events?.[0];

        if (nextContentfulEvent) {
            const contentfulISOStartTime = new Date(nextContentfulEvent.raw_start_time);
            const discordISOStartTime = new Date(nextDiscordEvent?.raw_start_time ?? Infinity);

            if (contentfulISOStartTime <= discordISOStartTime) {
                setContentfulEvent(nextContentfulEvent);
            }
        }

        if (!singleInteractions.startScreen.hasSeenStartScreen) {
            setTimeout(() => {
                singleInteractions.startScreen.setHasSeenStartScreen(true);
            }, START_SCREEN_DURATION + 1000);
        }
    }, [ events ]);

    return (
        <>
            { !singleInteractions.startScreen.hasSeenStartScreen && <StartScreen closeIn={START_SCREEN_DURATION} />}

            {contentfulEvent 
                ? <Event manualSlug={contentfulEvent.slug} />   
                : <Page background={home.content?.background} backgroundOptions={{brightness: 0.3}}>
                    <div className={styles.container} >
                        <OasisTeaser  />
                    </div>
                </Page> 
            }
        </>
    );
}
