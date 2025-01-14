import styles from './Reservations.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { PageContext } from '@contexts/Page';
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Page from '@components/Page/Page';
import Text from '@components/Text/Text';
import Button from '@components/Button/Button';
import Title from '@components/Title/Title';
import LinkButton from '@components/LinkButton/LinkButton';
import Separator from '@components/Separator/Separator';

// Utils
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Logo
import OasisLogo from '@assets/logo/logo.webp';
import LagoonLogo from '@assets/logo/lagoon-250.webp';

export default function Reservations() {

    const { reservations } = useContext(CMSContext);
    const { navigator } = useContext(PageContext);
    const { realm } = useContext(KiwiContext);

    function handleDiscordClick() {
        navigator.externalNavigate(realm.data?.discord_invite_link ?? '', true);
    }

    return (
        <Page background={reservations.content?.background}>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <div></div>

                    <Button 
                        name='Book through Discord' 
                        style='primary'
                        onClick={handleDiscordClick}
                    />
                </div>

                <div className={styles.content}>

                    <div className={styles.title}>

                        <div className={styles.logo}>
                            <img src={OasisLogo} />
                        </div>

                        <Title headline='Ready to make your evening unforgettable?' subline='' size='xl' />
                        <div className={styles.subline}>
                            <Text>
                                Head over to the
                                &#8203;<LinkButton 
                                    name= 'Oasis Discord' 
                                    target={''} 
                                    isUnderlined={true} 
                                    isNewTab={true} 
                                />&#8203;
                                and open a new ticket!
                            </Text>
                        </div>

                        {reservations?.content?.description &&
                            <div className={styles.description}>
                                <Text>
                                    {documentToReactComponents(reservations?.content?.description)}
                                </Text>

                                <Button name='Book a table for free' onClick={handleDiscordClick} style='accent' />
                            </div>
                        }
                        
                    </div>

                    <Separator />

                    <div className={styles.lagoon}>

                        <div className={styles.logo}>
                            <a href={'https://lagoon.events/'} target='_blank'>
                                <img src={LagoonLogo} />
                            </a>
                        </div>

                        {reservations?.content?.lagoonDescription &&
                            <div className={styles.description}>
                                <div className={styles.title}>
                                    <Title 
                                        headline={reservations.content?.lagoonTitle.headline ?? ''}
                                        size='lg'
                                    />
                                </div>

                                <Text>
                                    {documentToReactComponents(reservations?.content?.lagoonDescription)}
                                </Text>

                                <nav>
                                    <Button name='Lagoon Site' onClick={() => {navigator.externalNavigate('https://lagoon.events/', true)}} style='neutral' />
                                    <Button name='Book a private event' onClick={handleDiscordClick} style='accent' />
                                </nav>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Page>    
    );
}
