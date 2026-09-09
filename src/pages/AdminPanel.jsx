import { useState, useMemo } from "react";
import { useMenu } from "../context/MenuContext";
import AdminItemForm from "../components/AdminItemForm";
import { ADMIN_PASSCODE, ADMIN_SESSION_KEY } from "./adminConfig";
import styles from "./AdminPanel.module.css";

function AdminLogin({ onSuccess }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (value === ADMIN_PASSCODE) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Incorrect passcode.");
    }
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <h2>Admin Panel</h2>
        <p className={styles.loginHint}>Enter the owner passcode to manage the menu.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Passcode"
          autoFocus
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="submit" className={styles.primaryBtn}>Enter</button>
      </form>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1"
  );
  const {
    items,
    categoryMeta,
    categoryKeys,
    resolveImage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
  } = useMenu();

  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  const editingItem = useMemo(() => items.find((it) => it.id === editingId), [items, editingId]);

  const visibleItems = useMemo(() => {
    const list = filterCat === "all" ? items : items.filter((it) => it.category === filterCat);
    return [...list].sort((a, b) => a.category.localeCompare(b.category));
  }, [items, filterCat]);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
  }

  function handleDelete(item) {
    if (window.confirm(`Delete "${item.name.en}"? This cannot be undone.`)) {
      deleteMenuItem(item.id);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Menu Admin Panel</h1>
          <p className={styles.subtitle}>
            Changes here update the customer Menu (and Cart) immediately — they all read from
            the same menu data.
          </p>
        </div>
        <button className={styles.secondaryBtn} onClick={handleLogout}>Log out</button>
      </div>

      {(adding || editingItem) && (
        <div className={styles.panelCard}>
          <h3>{editingItem ? `Edit: ${editingItem.name.en}` : "Add a new item"}</h3>
          <AdminItemForm
            categoryKeys={categoryKeys}
            categoryMeta={categoryMeta}
            initial={editingItem}
            onCancel={() => {
              setAdding(false);
              setEditingId(null);
            }}
            onSave={(data) => {
              if (editingItem) {
                updateMenuItem(editingItem.id, data);
              } else {
                addMenuItem(data);
              }
              setAdding(false);
              setEditingId(null);
            }}
          />
        </div>
      )}

      {!adding && !editingItem && (
        <div className={styles.toolbar}>
          <button
            className={styles.primaryBtn}
            onClick={() => {
              setEditingId(null);
              setAdding(true);
            }}
          >
            + Add menu item
          </button>

          <select
            className={styles.filterSelect}
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="all">All categories ({items.length})</option>
            {categoryKeys.map((key) => (
              <option key={key} value={key}>
                {categoryMeta[key]?.icon} {categoryMeta[key]?.label?.en || key} (
                {items.filter((it) => it.category === key).length})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.itemGrid}>
        {visibleItems.map((item) => (
          <div key={item.id} className={`${styles.itemCard} ${!item.available ? styles.unavailable : ""}`}>
            <img src={resolveImage(item)} alt={item.name.en} className={styles.itemCardPhoto} />
            <div className={styles.itemCardBody}>
              <div className={styles.itemCardTop}>
                <span className={styles.itemCardCat}>
                  {categoryMeta[item.category]?.icon} {categoryMeta[item.category]?.label?.en || item.category}
                </span>
                {!item.available && <span className={styles.badgeOff}>Unavailable</span>}
              </div>
              <h4>{item.name.en}</h4>
              {item.name.hi && <p className={styles.itemCardHi}>{item.name.hi}</p>}
              <p className={styles.itemCardPrice}>{item.price}</p>
              {item.description && <p className={styles.itemCardDesc}>{item.description}</p>}

              <div className={styles.itemCardActions}>
                <button className={styles.smallBtn} onClick={() => { setAdding(false); setEditingId(item.id); }}>
                  Edit
                </button>
                <button className={styles.smallBtn} onClick={() => toggleAvailability(item.id)}>
                  {item.available ? "Mark unavailable" : "Mark available"}
                </button>
                <button className={styles.smallDangerBtn} onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && <p>No items in this category yet.</p>}
      </div>
    </div>
  );
}
