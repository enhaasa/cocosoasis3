import styles from './Home.module.scss';

import { useContext, useState, useLayoutEffect } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import OasisTeaser from '@components/OasisTeaser/OasisTeaser';
import StartScreen from '@components/StartScreen/StartScreen';


export default function Home() {
    const { home } = useContext(CMSContext);
    const [ showStartScreen ] = useState(true);

    useLayoutEffect(() => {
        /*
        setTimeout(() => {


            setShowStartScreen(false);
        }, START_SCREEN_DURATION);
        */
    }, []);

    return (
        <>
            {showStartScreen && <StartScreen closeIn={2500} />}
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
        </>
    );
}
