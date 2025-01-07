import styles from './AnimatedLogo.module.scss';

import { useRef, useEffect, useLayoutEffect, useState } from 'react';

// Images
import rightLeaf from '@assets/logo/right-leaf.png';
import leftLeaf from '@assets/logo/left-leaf.png';
import text from '@assets/logo/text.png';

// Animations
import gsap from 'gsap';

const ANIMATION_DURATION = 1;
const CONTAINER_RAISE = '100px';
const WING_DEGREE = '15deg';
const WING_RAISE = '50px';

interface IAnimatedLogo {
    delay: number;
}

export default function AnimatedLogo({ delay = 0 }: IAnimatedLogo) {

    const [ shouldRender, setShouldRender ] = useState(false);

    const containerRef = useRef(null);
    const leftLeafRef = useRef(null);
    const rightLeafRef = useRef(null);

    useLayoutEffect(() => {
        setTimeout(() => {
            setShouldRender(true);
        }, delay);
    }, []);

    useEffect(() => {
        if (!leftLeafRef || !rightLeafRef || !shouldRender) return;

        gsap.fromTo(containerRef.current, 
            { opacity: 0, y: CONTAINER_RAISE },
            { opacity: 1, y: 0, duration: ANIMATION_DURATION }
        );

        gsap.fromTo(leftLeafRef.current, 
            { y: WING_RAISE, transform: `rotate(-${WING_DEGREE})` },
            { y: 0, transform: 'rotate(0)', duration: ANIMATION_DURATION }
        );

        gsap.fromTo(rightLeafRef.current, 
            { y: WING_RAISE, transform: `rotate(${WING_DEGREE})` },
            { y: 0, transform: 'rotate(0)', duration: ANIMATION_DURATION }
        );
    }, [ shouldRender ]);

    return (
        <div className={`${styles.container} ${styles[shouldRender ? '': 'hidden']}`} ref={containerRef}>
            <div className={styles.images}>
                <img src={leftLeaf} className={styles.leftLeaf} ref={leftLeafRef}/>
                <img src={text} className={styles.text} />
                <img src={rightLeaf} className={styles.rightLeaf} ref={rightLeafRef} />
            </div>
        </div> 

    );
}
