import styles from './Separator.module.scss';

// Components
import Title from '@components/Title/Title';
import { ReactNode } from 'react';

interface ISeparator {
    label?: string;
    size?: 'md' | 'lg' | 'xl' | 'xxl';
    children?: ReactNode;
}

export default function Separator({ label, size, children }: ISeparator) {
    const hasContent = label || children;

    return (
        <div className={styles.container}>
            {hasContent ? (
                <>
                    <div className={`${styles.separator} ${styles.small}`} />
                    <div className={styles.label}>
                        {children ? children : <Title headline={label ?? ''} style='signature' size={size} />}
                    </div>
                    <div className={`${styles.separator} ${styles.small}`} />
                </>
            ) : (
                <div className={styles.separator} />
            )}
        </div>
    );
}
