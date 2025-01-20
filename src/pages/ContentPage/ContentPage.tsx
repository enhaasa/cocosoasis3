import styles from './ContentPage.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

// Contexts
import { CMSContext } from '@contexts/CMS';

// Components
import Page from '@components/Page/Page';
import NoResult from '@pages/Event/NoResult/NoResult';
import ResultLoading from '@pages/Event/ResultLoading/ResultLoading';
import ContentPageResult from './ContentPageResult/ContentPageResult';

export default function ContentPage() {
    const [content, setContent] = useState<any>(null);
    const [noresult, setNoresult] = useState(false);

    const { pages } = useContext(CMSContext);
    const { slug } = useParams();

    useEffect(() => {
        // reset
        setContent(null);
        setNoresult(false);

        // One day, my future self will eventually come back to this and curse over my past mistakes
        if (!pages.landingPage) return;

        const page = pages[slug ?? ''];

        if (page) {
            setContent(page);
        } else {
            setNoresult(true);
        }
    }, [slug, pages]);

    return (
        <Page background={content?.background}>
            <div className={styles.container}>
                {
                    content && !noresult
                        ? <ContentPageResult page={content} />
                        : !noresult
                            ? <ResultLoading />
                            : <NoResult text="404: Content page not found. Please check your slug." />
                }
            </div>
        </Page>
    );
}
