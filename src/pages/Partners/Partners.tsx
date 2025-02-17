import styles from './Partners.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import Title from '@components/Title/Title';
import PartnerCard from './PartnerCard/PartnerCard';
import Separator from '@components/Separator/Separator';
import ChainSpawn from '@components/ChainSpawn/ChainSpawn';

export default function Partners() {
    const { partners } = useContext(CMSContext);

    return (
        <Page background={partners.content?.background}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Title 
                        headline='Partnered Venues'
                        isWinged={true}
                        style='signature'
                        isCentered={true}
                        size='xl'
                    />
                </div>

                <Separator />

                <div className={styles.partnerVenues}>
                    <ChainSpawn 
                        items={partners.content?.partners.map((partner, index) => (
                            <PartnerCard key={`PartnerCardVenue-${index}`} partner={partner} />
                        )) ?? []

                        }
                    />
                </div>

                <div className={styles.title}>
                    <Title 
                        headline='Partnered Communities'
                        isWinged={true}
                        style='signature'
                        isCentered={true}
                        size='xl'
                    />
                </div>

                <Separator />

                <div className={styles.partnerVenues}>
                    <ChainSpawn 
                        items={partners.content?.communities.map((partner, index) => (
                            <PartnerCard key={`PartnerCardCommunity-${index}`} partner={partner} />
                        )) ?? []
                        }
                    
                    />
                </div>
            </div>    
        </Page>
    );
}
