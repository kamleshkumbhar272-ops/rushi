import styles from "../pages/Menu.module.css";
import AddToOrderButton from "./AddToOrderButton";
import { useMenu } from "../context/MenuContext";

/**
 * <MenuCategoryCard />
 * Renders one menu category as a colored-header block with dashed item
 * rows — magazine/menu-board style. Category filtering (tabs + pills)
 * lives entirely in Menu.jsx and is untouched by this component.
 *
 * Expects `category` in the shape from data/menuData.js:
 *  {
 *    icon: "🍜",
 *    label: { en: "NOODLES", hi: "नूडल्स" },
 *    items: [
 *      { name: { en: "Veg Noodles", hi: "वेज नूडल्स" }, price: "₹140" },
 *      ...
 *    ],
 *  }
 */

// Elegant color set standing in for the reference photo's colored bars,
// kept in the same champagne/luxury tonal family (deep, muted, not neon).





// To change color of header of menu category card, you can modify the HEADER_COLORS array. 
// Each color is defined as a linear gradient. You can add or remove colors from this array to customize the header colors for different categories.
//  The colorForLabel function uses this array to assign a color based on the category label, ensuring that each category consistently gets the same color
//  across renders and filters.




const HEADER_COLORS = [
  // "linear-gradient(135deg, #C9A84C, #B8923A)", // gold (brand)
  // "linear-gradient(135deg, #3F7A5E, #2F6B4F)", // bottle green
  // "linear-gradient(135deg, #C1552C, #A6431F)", // terracotta
  // "linear-gradient(135deg, #6B3B58, #55293F)", // deep plum
  // "linear-gradient(135deg, #355070, #29405A)", // slate blue
  // "linear-gradient(135deg, #5B3A29, #47281B)", // espresso
  "linear-gradient(135deg, #8B5E3C, #5C3A21)"
];

// Deterministic color per category, based on its label, so a given
// category always gets the same header color across renders/filters.
function colorForLabel(label) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  return HEADER_COLORS[hash % HEADER_COLORS.length];
}

export default function MenuCategoryCard({ category }) {
  const { resolveImage } = useMenu();
  if (!category) return null;
  const { icon, label, items } = category;
  const headerBg = colorForLabel(label.en);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader} style={{ background: headerBg }}>
        <div className={styles.cardHeaderLeft}>
          <span className={styles.cardIcon}>{icon}</span>
          <div>
            <h3 className={styles.cardTitle}>{label.en}</h3>
            <p className={styles.cardTitleHi}>{label.hi}</p>
          </div>
        </div>
        <span className={styles.cardCount}>{items.length} ITEMS</span>
      </div>

      <div className={styles.cardBody}>
        {items.map((item) => {
          const cartItem = {
            id: item.id,
            nameEn: item.name.en,
            price: item.priceValue,
            image: resolveImage(item),
          };

          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.itemLeft}>
                <img
                  className={styles.itemPhoto}
                  src={resolveImage(item)}
                  alt={item.name.en}
                  loading="lazy"
                />
                <div>
                  <span className={styles.itemName}>{item.name.en}</span>
                  <p className={styles.itemNameHi}>{item.name.hi}</p>
                  {item.description && (
                    <p className={styles.itemDesc}>{item.description}</p>
                  )}
                </div>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.itemPrice}>{item.price}</span>
                <AddToOrderButton item={cartItem} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}