import styles from './StaffCard.module.scss';
import { useContext } from 'react';

// Types
import { TCharacter } from '@enhasa/kiwicore';

// Contexts
import { UIContext } from '@contexts/UI';

// Components
import Text from '@components/Text/Text';
import StaffModal from '@components/StaffList/StaffModal/StaffModal';

interface IStaffCard {
    character: TCharacter;
}

export default function StaffCard({ character }: IStaffCard) {
    const { modals } = useContext(UIContext);

    function handleClick() {
        modals.add(
            <StaffModal 
                character={character}
            />
        );
    }

    return (
        <div className={styles.container}>
            {character.title !== 'staff' && 
                <div className={styles.titleWrapper}>
                    <div className={`${styles.title} ${styles[character.title.toLowerCase().replace(/\s+/g, '-')]}`}>
                        <Text>{character.title}</Text>
                    </div>
                </div>
            }

            <div className={styles.imageWrapper}>
                <div 
                    onClick={handleClick}
                    className={styles.image}
                    style={{backgroundImage: `url("${character.image_url?.trim()}")`}}
                />
            </div>

            <div className={styles.bottomWrapper}>
                <div className={styles.name}>
                    <Text>{character.name}</Text>
                </div>

                <div className={styles.positions}>
                    <Text size='sm'>{character.positions}</Text>
                </div>
            </div>            
        </div>    
    );
}
