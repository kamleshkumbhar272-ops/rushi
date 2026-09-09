import { useCart } from "../context/CartContext";
import styles from "./AddToOrderButton.module.css";

/**
 * Drop this next to each menu item's price.
 *
 * Usage inside MenuItem.jsx (adjust field names to match your real item shape):
 *
 *   <AddToOrderButton
 *     item={{
 *       id: item.id,
 *       nameEn: item.name.en,
 *       price: item.price,
 *     }}
 *   />
 */
export default function AddToOrderButton({ item }) {
  const { cart, addItem, decrementItem } = useCart();
  const qty = cart[item.id]?.qty || 0;

  if (qty === 0) {
    return (
      <button
        className={styles.addBtn}
        onClick={() => addItem(item)}
        aria-label={`Add ${item.nameEn} to order`}
      >
        <span className={styles.plusIcon}>+</span>
        <span className={styles.addLabel}>Add</span>
      </button>
    );
  }

  return (
    <div className={styles.stepper} role="group" aria-label={`${item.nameEn} quantity`}>
      <button
        className={styles.stepBtn}
        onClick={() => decrementItem(item.id)}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.qty} key={qty}>{qty}</span>
      <button
        className={styles.stepBtn}
        onClick={() => addItem(item)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}