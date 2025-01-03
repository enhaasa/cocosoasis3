/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import styles from './About.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import OasisLocation from '@components/Location/OasisLocation/OasisLocation';
import Highlight from '@components/Highlight/Highlight';
import VenueDetails from '@components/VenueDetails/VenueDetails';
import Title from '@components/Title/Title';
import Separator from '@components/Separator/Separator';
import PageCTA from '@components/PageCTA/PageCTA';

export default function About() {
    const { about } = useContext(CMSContext);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <OasisLocation />
                
                    <VenueDetails />
                </div>
                
                <div className={styles.title}>
                    <Title 
                        headline={about?.content?.headline}
                        subline={about?.content?.subline}
                        size='xl'
                        isCentered={true}
                        style='signature'
                    />
                </div>

                <Separator />

                <div className={styles.highlights}>
                {
                    about?.content?.highlights.map((highlight: any) => (
                        <Highlight
                            key={highlight.internalName}
                            images={highlight?.imageGallery?.map((img: any) => ({src: img?.file?.url}))}
                            headline={highlight.headline}
                            subline={highlight.subline}
                            text={documentToReactComponents(highlight.text)}
                        />
                    ))
                }
                </div>
                <PageCTA 
                    title='Ready to experience the Oasis?'
                    description='Proceed to'
                    button={{
                        target: '/reservations',
                        text: 'Reservations'
                    }}
                />
            </div>    
        </Page>
    );
}