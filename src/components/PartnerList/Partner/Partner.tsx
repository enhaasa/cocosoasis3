import styles from './Partner.module.scss';

// Components
import Text from '@components/Text/Text';

// Types
import { type Partner as PartnerType } from '@hooks/cms/usePartners';

interface IPartner {
    partner: PartnerType;
}

export default function Partner({ partner }: IPartner) {

    return (
        <div className={styles.container}>
            <Text size='sm'>
                <a href={partner.websiteLink} target='_blank'>
                    {partner.name}
                </a>
            </Text>
        </div>    
    );
}
