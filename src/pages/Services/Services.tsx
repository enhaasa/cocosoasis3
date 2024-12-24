/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Services.module.scss';
import { useContext, useRef } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import InfoCard from '@components/InfoCard/InfoCard';
import Grid from '@components/Grid/Grid';
import ChainSpawn from '@components/ChainSpawn/ChainSpawn';
import Title from '@components/Title/Title';
import Separator from '@components/Separator/Separator';
import PageCTA from '@components/PageCTA/PageCTA';

export default function Services() {
    const { services } = useContext(CMSContext);

    const ref = useRef(null);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.title}>
                        <Title 
                            headline={services?.content?.headline}
                            subline={services?.content?.subline}
                            size='xl'
                            style='standard'
                            isCentered={true}
                        />
                    </div>

                    <Separator />

                    <div className={styles.services} ref={ref}>
                        {services.content?.includedServices.length > 0 &&
                            <div className={styles.category}>
                                <div className={styles.serviceTitle}>
                                    <Title headline='Included' />
                                </div>

                                <div className={styles.cards}>
                                    <Grid>
                                        <ChainSpawn items={services.content?.includedServices.map((service: any) => 
                                            <InfoCard 
                                                title={service.headline} 
                                                background={service.background}
                                                description={service.description}
                                            />
                                        )} />
                                    </Grid>
                                </div>
                            </div>
                        }

                        {services.content?.paidServices.length > 0 &&
                            <div className={styles.category}>
                                <div className={styles.serviceTitle}>
                                    <Title headline='Additions' />
                                </div>
                                
                                <div className={styles.cards}>
                                    <Grid>
                                        <ChainSpawn items={services.content?.paidServices.map((service: any) => 
                                            <InfoCard 
                                                title={service.headline} 
                                                background={service.background}
                                                description={service.description}
                                            />
                                        )} />
                                    </Grid>
                                </div>
                            </div>
                        }
                    </div>

                    <PageCTA 
                        title='Ready to make your event a reality?'
                        description='Proceed to'
                        button={{
                            target: '/bookings',
                            text: 'Bookings'
                        }}
                    />

                </div>
            </div>
        </Page>    
    );
}
