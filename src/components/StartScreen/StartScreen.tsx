import styles from './StartScreen.module.scss';

import { useLayoutEffect, useRef } from 'react';

// Components
import DrawText from '@components/DrawText/DrawText';
import AnimatedLogo from '@components/AnimatedLogo/AnimatedLogo';

// Animation
import gsap from 'gsap';

interface IStartScreen {
    closeIn: number;
}

export default function StartScreen({ closeIn }: IStartScreen) {

    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    useLayoutEffect(() => {
        if (!wrapperRef.current) return;

        setTimeout(() => {
            // Wrapper
            gsap.fromTo(wrapperRef.current,
                { y: 0, opacity: 1 },
                { y: '-50%', opacity: 0, duration: 2 }
            );

            // Container
            gsap.fromTo(containerRef.current,
                { opacity: 1 },
                { opacity: 0, duration: 1 }
            );
        }, closeIn);
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.wrapper} ref={wrapperRef}>
                <DrawText text='Welcome' size='xxl' style='handwritten' />
                <DrawText text='to' size='xl' style='handwritten' delay={400} />
                <AnimatedLogo delay={1400} />
            </div>
        </div>    
    );
}
