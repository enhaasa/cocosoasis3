import { ReactNode, useContext, useEffect, useRef, useLayoutEffect } from "react";
import styles from './Modal.module.scss';

// Contexts
import { UIContext } from "@contexts/UI";

// Components
import Text from "@components/Text/Text";
import Icon from "@components/Icon/Icon";

// Animations
import animate, { AnimationDuration } from "@utils/animate";

// Icons
import icon from "@utils/icon";

// Types
import { IModalTimingProps } from "@hooks/modals/modalDefaults";

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
    const { modals } = useContext(UIContext);
    const ref = useRef(null);

    function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
    }

    function handleClose() {
        modals.closeCurrent();
    }

    useLayoutEffect(() => {
        if (!ref.current || id === undefined) return;

        setTimeout(() => {
            animate.slideIn(ref, 'top', {fade: true, duration: AnimationDuration.Fast});
        }, modals.get[id!.toString()].mountDelay);
    }, []);
    
    useEffect(() => {
        if (id === undefined) return;

        if (modals.get[id].isRemoving) {
            animate.slideOut(ref, 'top', {fade: true, duration: AnimationDuration.Fast});
        }
    }, [id, modals]);

    return (
        <div className={styles.container} onClick={handleModalClick} ref={ref}>
            <div 
                className={styles.header} 
                style={{justifyContent: `${closable ? 'space-between' : 'center'}`}}
            >
                <span>{headline}</span>
                {closable && 
                    <button onClick={handleClose} className={styles.closeButton}>
                        <Icon icon={icon.close} />
                    </button>
                }
            </div>
            <div className={styles.message}><Text>{message}</Text></div>
            <div 
                style={{ display: display }}
                className={styles.content}
            >
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
    )
}