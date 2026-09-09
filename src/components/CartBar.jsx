import { useCart } from "../context/CartContext";
import styles from "./CartBar.module.css";

export default function CartBar() {
  const { itemCount, total, openDrawer } = useCart();

  if (itemCount === 0) return null;

  return (
    <button className={styles.cartBar} onClick={openDrawer}>
      <span className={styles.count}>{itemCount} item{itemCount > 1 ? "s" : ""}</span>
      <span className={styles.total}>₹{total}</span>
      <span className={styles.cta}>View Order →</span>
    </button>
  );
}
