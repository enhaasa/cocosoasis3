/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import styles from './About.module.scss';

// Contexts
import { CMSContext } from '@contexts/CMS';
import { UIContext } from '@contexts/UI';

// Components
import Page from '@components/Page/Page';
import OasisLocation from '@components/Location/OasisLocation/OasisLocation';
import Highlight from '@components/Highlight/Highlight';
import VenueDetails from '@components/VenueDetails/VenueDetails';
import Title from '@components/Title/Title';
import Separator from '@components/Separator/Separator';
import PageCTA from '@components/PageCTA/PageCTA';
import StaffList from '@components/StaffList/StaffList';
import Rules from '@components/Rules/Rules';
import RichTextRenderer from '@components/RichTextRenderer';
import Text from '@components/Text/Text';
import Syncshell from '@components/Syncshell/Syncshell';

// LOgo
import Logo from '@assets/logo/logo.webp';
import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';

// Utils
import icon from '@utils/icon';

export default function About() {
    const { about } = useContext(CMSContext);
    const { modals } = useContext(UIContext);

    function handleRulesClick() {
        modals.add(
            <Modal headline='Rules' display='grid'>
                <div>
                    <Rules />
                </div>
            </Modal>
        );
    }

    function handleSyncshellClick() {
        modals.add(
            <Modal headline='Syncshell' display='grid'>
                <div>
                    <Syncshell />
                </div>
            </Modal>
        );
    }

    function handleStaffScrollClick() {
        location.hash = '';
        location.hash = '#staff-list';
    }

    return (
        <Page background={about?.content?.background} backgroundOptions={{ brightness: 0.4}}>
            <div className={styles.container}>
                <div className={styles.teaser}>
                    <OasisLocation />
                    <VenueDetails />
                </div>
            
                <div className={styles.logo}>
                    <img src={Logo} />
                </div>

                <nav>
                    <Button name='Staff' style='neutral' onClick={handleStaffScrollClick} icon={icon.chevronDown} /> 
                    <Button name='Rules' onClick={handleRulesClick} /> 
                    <Button name='Syncshell' onClick={handleSyncshellClick} />
                </nav>

                <div className={styles.highlights}>
                {
                    about?.content?.highlights.map((highlight: any, index: number) => (
                        <Highlight
                            key={`Highlight-${index}`}
                            images={highlight?.imageGallery?.map((img: any) => ({src: img?.file?.url}))}
                            headline={highlight.headline}
                            subline={highlight.subline}
                            text={<RichTextRenderer richTextDocument={highlight.text} />}
                        />
                    ))
                }
                </div>

                <div className={styles.title} >
                    <Title 
                        headline={'Our family'}
                        size='xl'
                        isCentered={true}
                        style='signature'
                        isWinged={true}
                    />
                    <div className={styles.flags}>
                        <Text size='md'>🇧🇪 🇫🇮 🇫🇷 🇩🇪 🇪🇸 🇸🇪 🇬🇧 🇨🇾</Text>
                    </div>
                </div>

                <div id='staff-list' />
                
                        
                <StaffList />

                <Separator />
                
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