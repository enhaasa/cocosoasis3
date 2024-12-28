import styles from './DiningItem.module.scss';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

// Components
import Text from '@components/Text/Text';
import Divider from '@components/Divider/Divider';

interface IDiningItem {
    item?: TDiningItem;
    showImage?: boolean;
    isReversed?: boolean;
}

export default function DiningItem({ item, showImage = true, isReversed = false }: IDiningItem) {

    return (
        <div className={styles.container}>

            <div className='col'>
                {item?.image_url && showImage &&
                <div className={styles.image}>
                    <img src={item?.image_url} />
                </div>
                }
            </div>
            
            <span className='col'>
                <div className={`${styles.titleWrapper} ${isReversed ? styles.reverse : ''}`}>
                    <span className={styles.title}>
                        <Text size='lg'>{item?.name}</Text>
                        {(item as any)?.icon &&
                            <img src={(item as any)?.icon} />
                        }
                    </span>

                    <div className={styles.price}>
                        {(item as any)?.original_price &&
                            <span className={styles.originalPrice}>
                                <Text size='sm'>
                                    {(item as any)?.original_price.toLocaleString('en-US')} gil
                                </Text>
                                <div className={styles.strikethrough} />
                            </span>
                        }
                        <Text>{item?.price?.toLocaleString('en-US')} gil</Text>
                    </div>
                </div>

                <Divider />
                
                <div className={`${styles.description} ${isReversed ? styles.reverse : ''}`}>
                    <Text>{item?.description}</Text>
                </div>

                <div className={`${styles.ingredients} ${isReversed ? styles.reverse : ''}`}>
                    <Text>{item?.ingredients.split(',').join(', ')}</Text>
                </div>
            </span>
        </div>    
    );
}
