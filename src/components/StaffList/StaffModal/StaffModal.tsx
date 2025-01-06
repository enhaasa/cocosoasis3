import styles from './StaffModal.module.scss';
import { useRef, useState } from 'react';

// Types
import { TCharacter } from '@enhasa/kiwicore';

// Components
import Modal from '@components/Modal/Modal';
import Text from '@components/Text/Text';

// Utils
import parseHtml from 'html-react-parser';
import { getTimeSinceDate } from '@utils/time';

// Animations
import gsap from 'gsap';

// Icons
import icon from '@utils/icon';
import Button from '@components/Button/Button';

// Images
import BackgroundImage from '@assets/images/thavnairian_wall2.webp';
import PalmImage1 from '@assets/images/palm_1.webp';
import PalmImage2 from '@assets/images/palm_2.webp';

interface IStaffModal {
    id?: number;
    character: TCharacter;
}

export default function StaffModal({ id, character }: IStaffModal) {
    const [ isBioOpen, setIsBioOpen ] = useState(false);
    const [ shouldTease, setShouldTease ] = useState(true);

    const bioWrapperRef = useRef(null);
    const bioRef = useRef(null);
    const coverRef = useRef(null);
    const readmoreRef = useRef(null);

    function handleBioClick() {
        if (!isBioOpen) {
            setShouldTease(false);

            gsap.set(readmoreRef.current, {display: 'none'});
            gsap.set(bioRef.current, {
                overflowY: 'auto'
            });

            gsap.to(bioWrapperRef.current, {
                marginTop: 0,
                height: '100%'
            });

            gsap.to(bioRef.current, {
                opacity: 1
            });

            setIsBioOpen(true);
        } else {
            gsap.set(readmoreRef.current, {display: 'flex'});
            gsap.set(bioRef.current, {
                overflowY: 'hidden'
            });

            gsap.to(bioRef.current, {
                opacity: 0.5
            });

            gsap.to(bioWrapperRef.current, {
                marginTop: '-10px',
                height: '48px',
                duration: 0.05,
                onComplete: () => {
                    setIsBioOpen(false);
                }
            });
        }
    }

    return (
        <Modal
            id={id}
            headline={character.name}
            background={BackgroundImage}
        >
            <div className={styles.container} >
                <div className={styles.header}>
                    <Text>{character.name}</Text>
                    <div className={styles.positions}>
                        <Text size='sm'>{character.positions}</Text>
                    </div>
                </div>

                <div 
                    className={styles.board}
                    style={{
                        backgroundImage: `url("${character.image_url?.trim()}")`
                    }}
                >
                    {character.bio !== '' &&
                        <div className={`${styles.bioWrapper} ${shouldTease ? styles.tease : ''}`} ref={bioWrapperRef}>
                            <div className={styles.bio} ref={bioRef}>
                                <Text>
                                    {parseHtml(character.bio)}
                                </Text>
                                <div 
                                    className={`${styles.cover} ${isBioOpen ? '' : styles.background}`} 
                                    ref={coverRef} 
                                />
                            </div>
                            
                            <div className={styles.readmore} ref={readmoreRef} onClick={handleBioClick}>
                                <Text size='sm'>Read biography</Text>
                                <img src={icon.chevronDown} />
                            </div>

                            {isBioOpen &&
                                <div className={styles.closeBioButton}>
                                    <Button onClick={handleBioClick} icon={icon.chevronDown} style='neutral' />
                                </div>
                            }
                        </div>
                    }

                    <div className={styles.plantWrapper}>
                        <img src={PalmImage1} className={styles.left} />
                        <img src={PalmImage2} className={styles.right}/>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Text size='sm'>Employed: {getTimeSinceDate(character.hired_date)}</Text>
                </div>
            </div>
        </Modal>
    );
}
