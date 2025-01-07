import styles from './StaffList.module.scss';
import { useContext } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import StaffCard from './StaffCard/StaffCard';

export default function StaffList() {
    const { staff } = useContext(KiwiContext);

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {
                    staff.characters?.map((character, index) => (
                        <StaffCard key={`StaffCard-${index}`} character={character} />
                    ))
                }
            </div>
        </div>    
    );
}
