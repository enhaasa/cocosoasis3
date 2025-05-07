import styles from './Testaufgabe.module.scss';
import { useContext } from 'react';

// Components
import Title from '@components/Title/Title';
import Button from '@components/Button/Button';
import Modal from '@components/Modal/Modal';
import Page from '@components/Page/Page';

// Context
import ModalContext from '@hooks/modals/ModalContext';

interface TestModalOptions {
    mountDelay?: number;
    dismountDelay?: number;
}

export default function Testaufgabe() {
    const modals = useContext(ModalContext);

    function handleTestModalClick(options: TestModalOptions) {
        const { mountDelay, dismountDelay } = options;

        const modal = 
        <Modal
            mountDelay={mountDelay}
            dismountDelay={dismountDelay}
            headline={`mountDelay: ${mountDelay ?? 'default'} | dismountDelay: ${dismountDelay ?? 'default'}`}
        >
            Hello there.
        </Modal>

        modals.add(modal);
    }

    return (
        <Page>
            <div className={styles.container}>
                <Title headline='Testaufgabe J.S' size='xxl' />
            
                <Button name='All defaults' onClick={() => handleTestModalClick({})} />
                <Button name='mountDelay 1000' onClick={() => handleTestModalClick({ mountDelay: 1000 })} />
                <Button name='dismountDelay 1000' onClick={() => handleTestModalClick({ dismountDelay: 1000 })} />
                <Button name='mountDelay 3000 - dismountDelay 1500' onClick={() => handleTestModalClick({ mountDelay: 3000, dismountDelay: 1500 })} />
            </div>    
        </Page>
    );
}
