import styles from './MultiToggle.module.scss';

import { useState } from 'react';

// Components
import Text from '@components/Text/Text';

interface IMultiToggle {
    options?: string[];
    onSelect: (option: string) => any;
}

export default function MultiToggle({ options, onSelect }: IMultiToggle) {
    const [ selectedOption, setSelectedOption ] = useState(options?.[0]);

    function handleSelect(option: string) {
        setSelectedOption(option);
        onSelect(option);
    }

    return (
        <div className={styles.container}>
            <nav>
                {
                    options?.map((option, index) => (
                        <button 
                            key={`MultiToggleOption-${index}`}
                            onClick={() => {handleSelect(options?.[index])}}
                            className={`${styles.option} ${option === selectedOption ? styles['selected'] : ''}`}
                        >
                            <Text>{option}</Text>
                        </button>
                    ))
                }
            </nav>
        </div>    
    );
}
