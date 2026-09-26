import 'flipbook-js/style.css';
import { PropsWithChildren } from 'react';
import Title from '@components/Title/Title';
import styles from './FlipBookPage.module.scss';
import { cx } from 'class-variance-authority';

interface FlipBookPageProps extends PropsWithChildren {
  title: React.ReactNode | string;
}

export function FlipBookPage({ title, children }: FlipBookPageProps) {
  return (
    <div className={cx(styles.root, 'c-flipbook__page')}>
      <div className={styles.title_wrapper}>
        <Title headline={title} isCentered={false} />
      </div>
      {children}
    </div>
  );
}
