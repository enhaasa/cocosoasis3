import styles from './PartnerCard.module.scss';
import { useLayoutEffect, useRef } from 'react';

// Types
import { type Partner } from '@hooks/cms/usePartners';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';
import RichTextRenderer from '@components/RichTextRenderer';

// Utils
import gsap from 'gsap';


interface IPartnerCard {
    partner: Partner;
}

export default function PartnerCard({ partner }: IPartnerCard) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            {transform: 'rotateX(-10deg) rotateY(15deg)', opacity: 0},
            {transform: 'rotateX(0deg) rotateY(0deg)', ease: 'elastic.out', duration: 2.2, opacity: 1},
        );
    }, []);

    return (
        <div className={styles.container} ref={ref}>
            
            {partner?.flags &&
                <div className={styles.flags}>
                    {partner.flags.map((flag, index) => (
                        <div className={`${styles.flag} ${styles[flag.color]}`} key={index}>
                            {flag.title}
                        </div>
                    ))}
                </div>
            }

            <div className={styles.logo}>
                <img src={partner.logo} />
            </div>

            <div className={styles.name}>
                <Title 
                    headline={partner.name}
                    subline={partner.address}
                    style='handwritten'
                    size={'xl'}
                    isCentered={true}
                />
            </div>

            <nav className={styles.links}>
                <a 
                    href={partner.discordLink} 
                    className={styles.link}
                    target='_blank' 
                ><Text>Discord</Text></a>

                <a 
                    href={partner.websiteLink} 
                    className={styles.link}
                    target='_blank' 
                ><Text>Website</Text></a>
            </nav>

           {partner.description &&
            <div className={styles.description}>
                <RichTextRenderer richTextDocument={partner.description} />
            </div>}
        </div>    
    );
}
