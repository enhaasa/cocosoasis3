import styles from './Rules.module.scss';
import { useContext } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Text from '@components/Text/Text';
import Title from '@components/Title/Title';

// Utils
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
                    <Text>
                        {documentToReactComponents(about.content.rules)}
                    </Text>
                </div>
            }
        </div>    
    );
}
