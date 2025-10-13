import { useContext } from 'react';
import styles from './MysteryDrinks.module.scss';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Title from '@components/Title/Title';
import InfoCard from '@components/InfoCard/InfoCard';
import Grid from '@components/Grid/Grid';
import ChainSpawn from '@components/ChainSpawn/ChainSpawn';

export default function MysteryDrinks() {
    const { mysteryDrinks } = useContext(CMSContext);

    const { background, drinks, headline, subline } = mysteryDrinks?.content || {};

    return (
        <Page background={background} backgroundOptions={{ brightness: 0.4}}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Title headline={headline} subline={subline} />
                </div>
                
                <div className={styles.drinks}>

                    <Grid>
                        {drinks && <ChainSpawn items={drinks?.map((drink: any) => 
                            <InfoCard 
                                title={drink.headline} 
                                background={drink.background}
                                description={drink.description}
                                isTemporarilyUnavailable={drink.isTemporarilyUnavailable}
                            />
                        )} />}
                    </Grid>
                </div>
            </div>    
        </Page>
    );
}
