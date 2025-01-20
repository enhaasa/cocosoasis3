import styles from './ContentPageResult.module.scss';
import { useRef, useLayoutEffect } from 'react';

// Animations
import animate from '@utils/animate';

// Components
import Title from '@components/Title/Title';
import RichTextRenderer from '@components/RichTextRenderer';

interface IContentPageResult {
    page: any;
}

export default function ContentPageResult({ page }: IContentPageResult) {

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        const animation = animate.slideIn(ref, 'bottom', {fade: true})

        return () => {
            animation?.kill();
        }
    }, []);

    return (
        <div className={styles.container} ref={ref}>
            {page?.fields?.headline && (
                <Title
                    headline={page.fields.headline}
                    style='signature'
                    size='xl'
                />
            )}
            <RichTextRenderer richTextDocument={page?.fields?.content} />
                    
        </div>    
    );
}
