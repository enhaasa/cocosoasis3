import styles from './OrnamentalDivider.module.scss';

interface IOrnamentalDivider {
  width?: number | string;
}

export function OrnamentalDivider({ width = 280 }: IOrnamentalDivider) {
  return (
    <div
      className={styles.divider}
      style={{ maxWidth: width }}
      aria-hidden="true"
    >
      <span className={styles.line} />
      <span className={styles.diamond}>
        <span className={styles.innerDiamond} />
      </span>
      <span className={styles.line} />
    </div>
  );
}
