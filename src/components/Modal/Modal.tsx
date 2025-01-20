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

interface IModal {
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
    display = 'flex'
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
        if (!ref.current) return;
        const animation = animate.slideIn(ref, 'top', {fade: true, duration: AnimationDuration.Fast});

        return () => {
            animation?.kill();
        }
    }, []);
    
    useEffect(() => {
        if (id === undefined) return;
        
        if (!modals.lifeSupportList.includes(id)) {
            animate.slideOut(ref, 'top', {fade: true, duration: AnimationDuration.Fast});

            setTimeout(()=> {
                modals.kill(id);
            }, 300);
        }
    }, [id, modals, modals.lifeSupportList]);

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