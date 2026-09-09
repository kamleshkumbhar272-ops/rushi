import styles from "../styles/MenuModule.module.css";
import AddToOrderButton from "./AddToOrderButton";

/**
 * Single menu row: name + price badge + add-to-order control.
 * item: { name: string, price: string }
 *
 * price can be a plain number-as-string ("120") or a dual price
 * like "100/120" (steam/fried, half/full, etc). For the cart we use
 * the FIRST number found as the orderable price — customers ordering
 * a dual-priced item get the lower/base variant added.
 */
function parsePrice(priceStr) {
  const match = String(priceStr).match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MenuItem({ item }) {
  const cartItem = {
    id: slugify(item.name),
    nameEn: item.name,
    price: parsePrice(item.price),
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemLeft}>
        <div className={styles.itemDot} />
        <span className={styles.itemName}>{item.name}</span>
      </div>
      <div className={styles.itemRight}>
        <span className={styles.itemPrice}>{item.price}</span>
        <AddToOrderButton item={cartItem} />
      </div>
    </div>
  );
}