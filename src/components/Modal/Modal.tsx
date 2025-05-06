import { ReactNode } from "react";
import styles from './Modal.module.scss';

// Types
import type { IModalTimingProps } from "@hooks/modals/modalDefaults";

// Hooks
import useModalBase from '@hooks/modals/useModalBase';

// Components
import Icon from "@components/Icon/Icon";
import Text from "@components/Text/Text";

// Icons
import icon from "@utils/icon";

interface IModal extends IModalTimingProps {
    id?: number;
    headline: string;
    message?: string;
    children?: ReactNode;
    closable?: boolean;
    background?: string | null;
    display?: 'flex' | 'grid';
}

export default function Modal({
    id,
    headline,
    message,
    children,
    closable = true,
    background = null,
    display = 'flex',
}: IModal) {
    const { ref, modals } = useModalBase(id);

    return (
        <div className={styles.container} onClick={e => e.stopPropagation()} ref={ref}>
            <div 
                className={styles.header} 
                style={{ justifyContent: closable ? 'space-between' : 'center' }}
            >
                <span>{headline}</span>
                {closable && (
                    <button onClick={modals.closeCurrent} className={styles.closeButton}>
                        <Icon icon={icon.close} />
                    </button>
                )}
            </div>
            {message && <div className={styles.message}><Text>{message}</Text></div>}
            <div style={{ display }} className={styles.content}>
                {children}
                <div className={styles.contentOverlay} />
            </div>
            <div className={styles.backgroundWrapper}>
                <div 
                    className={styles.background} 
                    style={{ backgroundImage: `url("${background}")` }}
                />
            </div>
        </div>
    );
}
