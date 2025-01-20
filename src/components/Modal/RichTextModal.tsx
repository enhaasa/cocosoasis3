// Components
import Modal from "./Modal";
import RichTextRenderer from "@components/RichTextRenderer";

// Types
import { Document } from '@contentful/rich-text-types';

export interface IRichTextModal {
    id?: number;
    headline: string;
    richText?: Document;
}

export default function RichTextModal({ headline, richText, id }: IRichTextModal) {
    
    return (
        <Modal
            id={id}
            headline={headline}
        >
            <RichTextRenderer richTextDocument={richText ?? ('' as unknown as Document)} />
        </Modal>
    )
}