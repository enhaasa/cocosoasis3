import styles from './Home.module.scss';

import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';

export default function Home() {
    const { home } = useContext(CMSContext);

    return (
        <Page>
            <div 
                className={styles.container} 
            >

                <div>Test</div>

                <div 
                    className={styles.background} 
                    style={{ backgroundImage: `url("${home.content?.background}")` }} 
                />
            </div>
        </Page>    
    );
}
