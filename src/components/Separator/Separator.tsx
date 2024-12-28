import styles from './Separator.module.scss';

// Components
import Title from '@components/Title/Title';

interface ISeparator {
    label?: string;
    size?: 'md' | 'lg' | 'xl' | 'xxl';
}

export default function Separator({ label, size }: ISeparator) {

    
    return (
        <div className={styles.container}>
            {label 
                ?
                <>
                    <div className={`${styles.separator} ${styles.small}`} />
                    <div className={styles.label}>
                        <Title headline={label ?? ''} style='handwritten' size={size} />
                    </div>
                    <div className={`${styles.separator} ${styles.small}`} />
                </>
                : <div className={styles.separator} />
            }
        </div>    
    );
}
