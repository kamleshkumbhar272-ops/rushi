import styles from "../styles/MenuModule.module.css";

/** Small ornamental gold divider used between headings. */
export default function GoldDivider() {
  return (
    <div className={styles.divider}>
      <div className={styles.dividerLine} />
      <div className={styles.dividerDiamond} />
      <div className={styles.dividerDot} />
      <div className={styles.dividerDiamond} />
      <div className={`${styles.dividerLine} ${styles.reverse}`} />
    </div>
  );
}
