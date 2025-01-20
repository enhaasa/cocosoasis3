import styles from './StaffList.module.scss';
import { useContext } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import StaffCard from './StaffCard/StaffCard';
import LinkButton from '@components/LinkButton/LinkButton';

// Icons
import icon from '@utils/icon';

export default function StaffList() {
    const { staff } = useContext(KiwiContext);

    return (
        <div className={styles.container}>
            <div className={styles.listWrapper}>
                <div className={styles.list}>
                    {
                        staff.characters?.map((character, index) => (
                            <StaffCard key={`StaffCard-${index}`} character={character} />
                        ))
                    }
                </div>

                <div className={styles.memories}>
                    <LinkButton 
                        icon={icon.flower}
                        name={'In memory of Captain Stephanie'} 
                        target='/p/memory-of-stephanie' 
                        isUnderlined={true} 
                    />
                </div>
            </div>

        </div>    
    );
}
