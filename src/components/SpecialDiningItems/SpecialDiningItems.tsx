import styles from './SpecialDiningItems.module.scss';
import { useMemo } from 'react';

// Icons
import dining_icon  from '@utils/dining_icon';

// Types
import { TDiningItem } from '@enhasa/kiwicore';

// Components
import Title from '@components/Title/Title';
import DiningItem from '@components/MenuList/DiningItem/DiningItem';
import Separator from '@components/Separator/Separator';


type SpecialDiningItems = {
    [key: string]: TDiningItem;
}

interface ISpecialDiningItems {
    items: SpecialDiningItems | null;
}

export default function SpecialDiningItems({ items }: ISpecialDiningItems) {
    const parsedItems = useMemo(() => {
        if (!items) return [];

        return Object.keys(items).map(category => {
            return {
                ...items[category],
                icon: (dining_icon as any)[category.toLowerCase()] ?? ''
            }
        });
    }, [items]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <Title headline='Deals of the Week' style='signature' isNeon={true} size='md' />
                    
                    {parsedItems.map((item, index) => (
                        <>
                            <DiningItem 
                                key={`SpecialDiningItem-${index}`}
                                item={item} 
                                showImage={false} 
                                isReversed={(index % 2 !== 0)} 
                            />

                            {index !== parsedItems.length -1 &&
                                <Separator label='&' size='md' />
                            }
                        </>
                    ))
                    }
                </div>
            </div>
        </div>    
    );
}
