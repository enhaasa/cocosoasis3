import { useRef, useLayoutEffect, useEffect } from 'react';
import animate, { AnimationDuration } from '@utils/animate';
import { useContext } from 'react';
import ModalContext from './ModalContext';

export default function useModalBase(id?: number) {
    const ref = useRef(null);
    const modals = useContext(ModalContext);

    useLayoutEffect(() => {
        if (!ref.current || id === undefined) return;

        setTimeout(() => {
            animate.slideIn(ref, 'top', {
                fade: true,
                duration: AnimationDuration.Fast,
            });
        }, modals.get[id.toString()]?.mountDelay || 0);
    }, [id]);

    useEffect(() => {
        if (id === undefined) return;

        if (modals.get[id]?.isRemoving) {
            animate.slideOut(ref, 'top', {
                fade: true,
                duration: AnimationDuration.Fast,
            });
        }
    }, [id, modals]);

    return { ref, modals };
}
