import styles from './SiteContainer.module.scss';

import { useContext, useEffect } from 'react';

// Contexts
import { PageContext } from '@contexts/Page';
import Footer from '@components/Footer/Footer';

interface ISiteContainer {
    children?: React.ReactNode;
}

export default function SiteContainer({ children }: ISiteContainer) {
    const { navigator, singleInteractions } = useContext(PageContext);

    useEffect(() => {
        if (!['/', '/home'].includes(navigator.getCurrentPath())) {
            singleInteractions.startScreen.setHasSeenStartScreen(true);
        }
    }, []);

    return (
        <div className={styles.container}>
            <main>
                { children }
            </main>

            <footer>
                <Footer />    
            </footer>
        </div>    
    );
}
