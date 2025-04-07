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

                <div className={styles.categories}>
                        {
                            partners.content?.partnerCategories.map((category, index) => (
                                <div className={styles.category}>
                                    <div className={styles.headline} key={`PartnerCategory-${index}`}>
                                        <Title headline={category.headline} size='xl' isNeon={true} isCentered={false} />
                                    </div>

                                    {index !== partners.content?.partnerCategories.length &&
                                        <div className={styles.bottomSeparator}>
                                            <Separator />
                                        </div>
                                    }

                                    <div className={styles.venues}>
                                        <ChainSpawn items={category.items.map(partner => <PartnerCard key={`PartnerCard-${index}`} partner={partner} />)} />
                                    </div>

                                    {index +1 !== partners.content?.partnerCategories.length &&
                                        <Separator />
                                    }

                                </div>
                            ))
                        }
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

                <div className={styles.categories}>

                    <div className={styles.category}>
                        <div className={styles.venues}>
                            <ChainSpawn 
                                items={partners.content?.communities.map((partner, index) => (
                                    <PartnerCard key={`PartnerCardCommunity-${index}`} partner={partner} />
                                )) ?? []
                                }
                            
                            />
                        </div>
                    </div>
                </div>
            </div>    
        </Page>
    );
}
