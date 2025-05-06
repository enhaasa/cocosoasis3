import styles from './Testaufgabe.module.scss';
import { useContext } from 'react';

// Components
import Title from '@components/Title/Title';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';

// Context
import ModalContext from '@hooks/modals/ModalContext';

export default function Testaufgabe() {
    const modals = useContext(ModalContext);

    function handleTestModalClick(mountDelay?: number, dismountDelay?: number) {
        const modal = 
        <Modal
            mountDelay={mountDelay}
            dismountDelay={dismountDelay}
            headline={`mountDelay: ${mountDelay} | dismountDelay: ${dismountDelay}`}
        >
            Hello there.
        </Modal>

        modals.add(modal);
    }

    return (
        <div className={styles.container}>
            <Title headline='Testaufgabe J.S' size='xxl' />

            <Button name='mountDelay 1000' onClick={handleTestModalClick} />
        </div>    
    );
}
