import styles from './Rules.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Title from '@components/Title/Title';
import RichTextRenderer from '@components/RichTextRenderer';

export default function Rules() {
    const { about } = useContext(CMSContext);



    return (
        <div className={styles.container}>
            <Title 
                headline='Rules'
                style='handwritten'
                size='xl'
            />

            {about.content?.rules &&
                <div className={styles.content}>
                    <RichTextRenderer richTextDocument={about.content.rules}  />
                </div>
            }
        </div>    
    );
}
