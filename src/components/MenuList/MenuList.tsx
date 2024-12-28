import styles from './MenuList.module.scss';
import { useContext, useState, useEffect, useRef } from 'react';

// Contexts
import { KiwiContext } from '@contexts/Kiwi';

// Components
import Category from './Category/Category';
import DiningItem from './DiningItem/DiningItem';
import ChainFadeIn from '@components/ChainFadeIn/ChainFadeIn';
import Title from '@components/Title/Title';

// Animations
import animate from '@utils/animate';
import dining_icon from '@utils/dining_icon';

export default function MenuList() {
    const { menu } = useContext(KiwiContext);
    const [ selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { categories } = menu;

    const resultsRef = useRef(null);

    function selectCategory(category?: string) {
        if (!category || !resultsRef.current) return;

        animate.slideOut(resultsRef, 'bottom', {fade: true});
        
        setTimeout(() => {
            setSelectedCategory(category);
            animate.slideIn(resultsRef, 'bottom', {fade: true});
        }, 400);
    }

    useEffect(() => {
        if (!categories) return;
        setSelectedCategory(Object.keys(categories)[0]);
    }, [categories]);

    return (
        <div className={styles.container}>
            <div className={styles.navWrapper}>
                <nav className={styles.nav}>
                    {Object.keys(categories ?? {}).map((category, index) => (
                        <Category 
                            key={`MenuListCategory-${index}`}
                            title={category} 
                            count={categories?.[category].length} 
                            isSelected={selectedCategory === category}
                            selectCategory={selectCategory}
                        />
                    ))}
                </nav>
            </div>

            <div className={styles.results} ref={resultsRef}>
                <>
                    <Title 
                        headline={selectedCategory ?? ''} 
                        isWinged={true} 
                        style='handwritten' 
                        icon={(dining_icon as any)[selectedCategory?.toLocaleLowerCase() ?? '']}
                    />
                    {selectedCategory &&
                        <ChainFadeIn
                            items={categories?.[selectedCategory]?.map(item => <DiningItem item={item} />)}
                        />
                    }
                </>
            </div>
        </div>    
    );
}
