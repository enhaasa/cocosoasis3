import styles from './DiningItem.module.scss';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

// Components
import Text from '@components/Text/Text';
import Divider from '@components/Divider/Divider';

interface IDiningItem {
    item?: TDiningItem;
}

export default function DiningItem({ item }: IDiningItem) {

    return (
        <div className={styles.container}>

            
            <div className='col'>
                {item?.image_url &&
                <div className={styles.image}>
                    <img src={item?.image_url} />
                </div>
                }
            </div>
            
            <span className='col'>
                <div className={styles.title}>
                    <Text size='lg'>{item?.name}</Text>

                    <div className={styles.price}>
                        {<Text>{item?.price?.toLocaleString('en-US')} gil</Text>}
                    </div>
                </div>

                <Divider />
                
                <div className={styles.description}>
                    <Text>{item?.description}</Text>
                </div>

                <div className={styles.ingredients}>
                    <Text>{item?.ingredients.split(',').join(', ')}</Text>
                </div>
            </span>
        </div>    
    );
}
