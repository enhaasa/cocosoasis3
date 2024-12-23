import styles from './Footer.module.scss';

// Components
import Text from '@components/Text/Text';

export default function Footer() {

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <span><Text>©2022-2024 Coco's Oasis</Text></span>
                <span>&bull;</span>
                <span>
                    <Text>
                        Website by _enhasa
                    </Text>
                </span>
            </nav>
        </div>    
    );
}
