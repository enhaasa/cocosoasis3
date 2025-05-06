import styles from './PartnerList.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Partner from './Partner/Partner';
import Text from '@components/Text/Text';

export default function PartnerList() {
    const { partners } = useContext(CMSContext);

    return (
        <div className={styles.container}>
            <div className={styles.category}>
                <div className={styles.title}>
                    <Text>Partnered Venues</Text>
                </div>

                <div className={styles.list}>
                    {
                        partners.content?.partnerCategories.map((category, index) => (
                            <div key={`Category-${index}`}>
                                {category.items.map((partner, index) => (
                                    <Partner key={`Partner-${index}`} partner={partner} />
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles.category}>
                <div className={styles.title}>
                    <Text>Partnered Communities</Text>
                </div>

                <div className={styles.list}>
                    {
                        partners.content?.communities.map((partner, index) => (
                            <Partner key={`PartnerCommunity-${index}`} partner={partner} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
