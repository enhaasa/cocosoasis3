import styles from './Home.module.scss';

import { useContext, useLayoutEffect } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { PageContext } from '@contexts/Page';

// Components
import Page from '@components/Page/Page';
import OasisTeaser from '@components/OasisTeaser/OasisTeaser';
import StartScreen from '@components/StartScreen/StartScreen';

const START_SCREEN_DURATION = 3000;

export default function Home() {
    const { home } = useContext(CMSContext);
    const { singleInteractions } = useContext(PageContext);

    useLayoutEffect(() => {
        if (!singleInteractions.startScreen.hasSeenStartScreen) {
            setTimeout(() => {
                singleInteractions.startScreen.setHasSeenStartScreen(true);
            }, START_SCREEN_DURATION + 1000);
        }
    }, []);

    return (
        <>
            { !singleInteractions.startScreen.hasSeenStartScreen && <StartScreen closeIn={START_SCREEN_DURATION} />}
            <Page background={home.content?.background} backgroundOptions={{brightness: 0.3}}>
                <div 
                    className={styles.container} 
                    >

                    <OasisTeaser />
                </div>
            </Page>    
        </>
    );
}
