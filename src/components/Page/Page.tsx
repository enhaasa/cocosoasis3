import styles from './Page.module.scss';
import { useLayoutEffect, useRef, useContext } from 'react';

// Contexts
import { UIContext } from '@contexts/UI';

// Animations
import gsap from 'gsap';
import animate from '@utils/animate';

interface IPage {
    children: React.ReactNode;
    background?: string;
    backgroundOptions?: {
        blur?: 'default' | number,
        brightness?: 'default' | number,
    }
}

const DEFAULT_BACKGROUND_OPTIONS = {
    blur: 4,
    brightness: 0.6 
}

export default function Page({ background, backgroundOptions = DEFAULT_BACKGROUND_OPTIONS, children }: IPage) {
    const { page } = useContext(UIContext);

    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    if (backgroundOptions !== DEFAULT_BACKGROUND_OPTIONS) {
        backgroundOptions = {
            ...DEFAULT_BACKGROUND_OPTIONS,
            ...backgroundOptions
        }
    }

    useLayoutEffect(() => {
        if (!containerRef.current || !backgroundRef.current) return;

        const containerAnimation = page.isShow 
            ? animate.slideIn(containerRef, 'bottom', {fade: true})
            : animate.slideOut(containerRef, 'bottom', {fade: true})

        const backgroundAnimation = page.isShow
            ? gsap.fromTo(backgroundRef.current, {opacity: 0}, {opacity: 1, duration: 1})
            : gsap.fromTo(backgroundRef.current, {opacity: 1}, {opacity: 0});

        return () => {
            containerAnimation?.kill();
            backgroundAnimation?.kill();
        }

    }, [page.isShow]);

    return (
        <>
            <div className={styles.container} ref={containerRef}>
                {children}
            </div>    

            {
                <div 
                    ref={backgroundRef}
                    className={styles.background} 
                    style={{ 
                        backgroundImage: `url("${background}")`,
                        filter: `blur(${backgroundOptions.blur}px) brightness(${backgroundOptions.brightness})`
                    }} 
                />
            }
        </>
    );
}
