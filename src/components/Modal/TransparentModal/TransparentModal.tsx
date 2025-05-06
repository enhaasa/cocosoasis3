import { ReactNode } from "react";
import styles from './TransparentModal.module.scss';

// Hooks
import useModalBase from '@hooks/modals/useModalBase';

// Components
import Button from "@components/Button/Button";

// Icons
import icon from "@utils/icon";

// Types
import { IModalTimingProps } from "@hooks/modals/modalDefaults";

interface ITransparentModal extends IModalTimingProps {
    id?: number;
    headline: string;
    message?: string;
    children?: ReactNode;
}

export default function TransparentModal({
    id,
    headline,
    message,
    children
}: ITransparentModal) {
    const { ref, modals } = useModalBase(id);

    return (
        <div className={styles.container} onClick={modals.closeCurrent} ref={ref}>
            <div className={styles.header} style={{ justifyContent: 'space-between' }}>
                <span>{headline}</span>
                <Button style={false} icon={icon.close} onClick={modals.closeCurrent} size={'lg'} />
            </div>
            <div className={styles.message}>{message}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
