import styles from './SeatingPlanModal.module.scss';

// Components
import Modal from '@components/Modal/Modal';
import SeatingPlan from './SeatingPlan/SeatingPlan';

export interface ISeatingPlanModal {
    id?: number;
}

export default function SeatingPlanModal({ id }: ISeatingPlanModal) {

    return (
        <div className={styles.container}>
            <Modal 
                id={id}
                headline='Seating Availability'
            >
                <SeatingPlan />
            </Modal>
        </div>    
    );
}
