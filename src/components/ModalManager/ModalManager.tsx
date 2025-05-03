/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ModalManager.module.scss';
import { useContext, useLayoutEffect, useRef, useState } from "react"

// Contexts
import { UIContext } from "@contexts/UI";

// Animations
import animate, { AnimationDuration } from '@utils/animate';

const BG_FADE_DURATION = 300;

export default function ModalManager() {
    const {
        modals
    } = useContext(UIContext);

    const [ show, setShow ] = useState(false);
    const isDarkenedRef = useRef(false);
    const elementRef = useRef(null);

    const reversedModals = Object.values(modals.get).slice().reverse();

    function shouldBlur(index: number) {
        if (Object.values(modals.get).length < 2) return false;

        return index === 0;
    }

    useLayoutEffect(() => {
        if (!elementRef.current) return;
    
        const modalCount = Object.values(modals.get).length;
    
        if (modalCount > 0) {
            if (!isDarkenedRef.current) {
                animate.darkenBgIn(elementRef);
                isDarkenedRef.current = true;
            }
            setShow(true);
        } else {
            if (isDarkenedRef.current) {
                animate.darkenBgOut(elementRef, { duration: AnimationDuration.Fast });
                isDarkenedRef.current = false;
            }
    
            setTimeout(() => {
                setShow(false);
            }, BG_FADE_DURATION);
        }
    }, [modals.get]);
    

    return (
        <div 
            ref={elementRef} 
            className={styles.container}
            onClick={modals.closeCurrent}
            style={{ display: show ? 'grid' : 'none'}}
        >
            {reversedModals.map((modal: any, index: number) => (
                <div 
                    className={`${styles.modalDisplay} ${shouldBlur(index) ? 'blurred' : ''}`}
                    key={`Modal-${index}`} 
                >
                    {modal.component}
                </div>
            ))}
        </div>
    )
}