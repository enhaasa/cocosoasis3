import styles from './PartnerCard.module.scss';

// Types
import { type Partner } from '@hooks/cms/usePartners';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import LinkButton from '@components/LinkButton/LinkButton';

// Utils
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


interface IPartnerCard {
    partner: Partner;
}

export default function PartnerCard({ partner }: IPartnerCard) {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={partner.logo} />
            </div>

            <div className={styles.name}>
                <Title 
                    headline={partner.name}
                    subline={'Placeholder Address'}
                    style='handwritten'
                    size={'xl'}
                    isCentered={true}
                />
            </div>

            <nav className={styles.links}>
                <a 
                    href={partner.discordLink} 
                    className={styles.link}
                    target='_blank' 
                ><Text>Discord</Text></a>

                <a 
                    href={partner.websiteLink} 
                    className={styles.link}
                    target='_blank' 
                ><Text>Website</Text></a>
            </nav>

            <div className={styles.description}>
                <Text>
                    {documentToReactComponents(partner.description)}
                </Text>
            </div>
        </div>    
    );
}
