import styles from './InfoCard.module.scss';
import { useRef, useLayoutEffect, useContext } from 'react';
import { Document } from '@contentful/rich-text-types';

// Contexts
import { UIContext } from '@contexts/UI';

// Components
import Text from '@components/Text/Text';
import InfoCardModal from './InfoCardModal/InfoCardModal';

// Animations
import gsap from 'gsap';

interface IInfoCard {
    title: string;
    background?: string;
    description?: Document;
    eventExclusivity?: string;
    isTemporarilyUnavailable: boolean;
}

export default function InfoCard({ title, background, description, eventExclusivity, isTemporarilyUnavailable }: IInfoCard) {
    const { modals } = useContext(UIContext);

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            {transform: 'rotateX(-10deg) rotateY(15deg)', opacity: 0},
            {transform: 'rotateX(0deg) rotateY(0deg)', ease: 'elastic.out', duration: 2.2, opacity: 1},
        );
    }, []);

    function handleClick() {
        modals.add(
            <InfoCardModal 
                title={title} 
                description={description}
                background={background}
            />
        )
    }

    return (
        <div className={`${styles.container} ${eventExclusivity ? styles[eventExclusivity] : ''}`} onClick={handleClick} >
            <div className={styles.card} ref={ref}>
                <div 
                    className={`${styles.background} ${isTemporarilyUnavailable ? styles.isTemporarilyUnavailable : ''}`} 
                    style={{backgroundImage: `url("${background}")` }} 
                />

                <div className={styles.content}>
                    <div className={styles.title}>
                        <div className={styles.titleBackground} />

                        <Text size='lg'>{title}</Text>

                        <div className={styles.separatorWrapper}>
                            <div className={styles.separator} />
                        </div>
                    </div>
                </div>

                {isTemporarilyUnavailable &&
                    <div className={styles.isTemporarilyUnavailable}>
                        <Text>Temporarily Unavailable</Text>
                    </div>
                }
            </div>
        </div>    
    );
}
