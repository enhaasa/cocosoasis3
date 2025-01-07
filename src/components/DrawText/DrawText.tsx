import styles from './DrawText.module.scss';
import { useState, useLayoutEffect } from 'react';

// Utils
import { Size } from '@utils/sizes';

// Components
import Text from '@components/Text/Text';

interface IDrawText {
    text: string;
    size?: Size;
    style?: 'handwritten' | 'standard';
    delay?: number;
}

export default function DrawText({ text, size = 'md', style = 'standard', delay = 0 }: IDrawText) {
    const [ showContent, setShowContent ] = useState(false);

    useLayoutEffect(() => {
        if (!delay) {
            setShowContent(true);
            return;
        }

        setTimeout(() => {
            setShowContent(true);
        }, delay);
    }, []);

    return (
        <div className={`${styles.container} ${styles[style]} ${styles[showContent ? 'show' : '']}`}>
            <Text 
                string={text}
                size={size}
            />    
        </div>    
    );
}
