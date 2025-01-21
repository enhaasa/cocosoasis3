/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './InfoCardModal.module.scss';

import { Document } from '@contentful/rich-text-types';

// Components
import ContentModal from '@components/Modal/ContentModal';
import RichTextRenderer from '@components/RichTextRenderer';

interface IInfoCardModal {
    id?: number;
    title: string;
    description?: Document;
    background?: string;
}

export default function InfoCardModal({ id, title, description, background }: IInfoCardModal) {

    return (
        <ContentModal
            id={id}
            headline={title}
            background={background}
        >
            {description &&
                <div className={styles.container}>
                    <RichTextRenderer richTextDocument={description} />
                </div>
            }
        </ContentModal>
    );
}
