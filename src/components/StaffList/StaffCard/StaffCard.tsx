import styles from './StaffCard.module.scss';

// Types
import { TCharacter } from '@enhasa/kiwicore';

// Components
import Text from '@components/Text/Text';

interface IStaffCard {
    character: TCharacter;
}

export default function StaffCard({ character }: IStaffCard) {

    function parsePositions(positions: string) {
        return positions.split(',')
            .map(position => capitalizeFirstLetter(position))
            .join(' & ');
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                    className={styles.image}
                    style={{backgroundImage: `url("${character.image_url?.trim()}")`}}
                />
            </div>

            <div className={styles.bottomWrapper}>
                <div className={styles.name}>
                    <Text>{character.name}</Text>
                </div>

                <div className={styles.positions}>
                    <Text size='sm'>{parsePositions(character.positions)}</Text>
                </div>
            </div>            
        </div>    
    );
}
