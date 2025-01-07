import styles from './Footer.module.scss';

// Components
import Text from '@components/Text/Text';
import PartnerList from '@components/PartnerList/PartnerList';

// Utils
import { getCurrentYear } from '@utils/time';

// Icons
import GithubIcon from '@assets/external_icons/github-mark-white.svg';

export default function Footer() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div>
                    <PartnerList />
                </div>

                <div className={styles.siteinfo}>
                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Text>©2022-{getCurrentYear()} Coco's Oasis</Text>
                        </div>

                        <div className={styles.developer}>
                            <Text size='sm'>
                                Website developed by 
                                <a href='https://github.com/enhaasa' target='_blank'>
                                    <img src={GithubIcon} /> Enhasa
                                </a>
                            </Text>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Text>Links</Text>
                        </div>

                        <div className={styles.links}>
                            <Text size='sm'>
                                <a href='https://google.se' target='_blank'>Coco's Oasis Discord</a>
                            </Text>
                            <Text size='sm'>
                                <a href='https://lagoon.events' target='_blank'>The Lagoon</a>
                            </Text>
                        </div>
                    </div>
                </div>
            </nav>
        </div>    
    );
}
