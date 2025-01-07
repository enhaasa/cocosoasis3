import styles from './SpecialDiningItem.module.scss';

// Components
import Text from '@components/Text/Text';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

interface ISpecialDiningItem {
    item?: TDiningItem;
}

export default function SpecialDiningItem({ item }: ISpecialDiningItem) {

    return (
        <div className={styles.container}>
            <Text>{item?.name}</Text>
        </div>    
    );
}
