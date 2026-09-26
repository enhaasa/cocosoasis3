import { useContext, useEffect } from 'react';
import { FlipBookPage } from './partials/FlipBookPage';
import { KiwiContext } from '@contexts/Kiwi';
import FlipBook from 'flipbook-js';
import 'flipbook-js/style.css';
import styles from './MenuFlipBook.module.scss';
import DiningItem from '@components/MenuList/DiningItem/DiningItem';

export function MenuFlipBook() {
  const { menu } = useContext(KiwiContext);

  const categories = Object.entries(menu.categories ?? {});

  useEffect(() => {
    if (categories.length === 0) return;

    new FlipBook('FlipBookMenu', {
      canClose: true,
      height: '620px',
      width: '100%',
    });
  }, [categories.length]);

  return (
    <div className={styles.wrapper}>
      <div className={`c-flipbook ${styles.flipbook}`} id="FlipBookMenu">
        <FlipBookPage title="Menu" />

        {categories.map(([title, items]) => (
          <FlipBookPage key={title} title={title}>
            <div>
              {items.map((item) => (
                <DiningItem item={item} />
              ))}
            </div>
          </FlipBookPage>
        ))}
      </div>
    </div>
  );
}
