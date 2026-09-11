import { useEffect, useMemo, useState } from "react";
import { useMenu } from "../context/MenuContext";
import AdminItemForm from "../components/AdminItemForm";
import { supabase } from "../lib/supabase";
import styles from "./AdminPanel.module.css";

function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    onSuccess(data.session);
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <h2>Admin Panel</h2>
        <p className={styles.loginHint}>Sign in with the café owner account to manage the menu.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          autoComplete="email"
          required
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminPanel() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  const {
    items,
    loading: menuLoading,
    menuError,
    categoryMeta,
    categoryKeys,
    resolveImage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
  } = useMenu();

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setAuthLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const editingItem = useMemo(() => items.find((it) => it.id === editingId), [items, editingId]);

  const visibleItems = useMemo(() => {
    const list = filterCat === "all" ? items : items.filter((it) => it.category === filterCat);
    return [...list].sort((a, b) => a.category.localeCompare(b.category));
  }, [items, filterCat]);

  if (authLoading) {
    return <div className={styles.loginWrap}><p>Checking admin session…</p></div>;
  }

  if (!session) return <AdminLogin onSuccess={setSession} />;

  async function handleSave(data) {
    setActionError("");
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, data);
      } else {
        await addMenuItem(data);
      }
      setAdding(false);
      setEditingId(null);
    } catch (error) {
      setActionError(error.message || "Could not save the menu item.");
      throw error;
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.name.en}"? This cannot be undone.`)) return;
    setActionError("");
    try {
      await deleteMenuItem(item.id);
    } catch (error) {
      setActionError(error.message || "Could not delete the menu item.");
    }
  }

  async function handleToggle(item) {
    setActionError("");
    try {
      await toggleAvailability(item.id);
    } catch (error) {
      setActionError(error.message || "Could not change availability.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Menu Admin Panel</h1>
          <p className={styles.subtitle}>
            Changes are saved to the online menu database and can update every open website in real time.
          </p>
        </div>
        <button className={styles.secondaryBtn} onClick={handleLogout}>Log out</button>
      </div>

      {menuError && <p className={styles.errorText}>{menuError}</p>}
      {actionError && <p className={styles.errorText}>{actionError}</p>}

      {menuLoading && <p>Loading online menu…</p>}

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
            onSave={handleSave}
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
                <button className={styles.smallBtn} onClick={() => handleToggle(item)}>
                  {item.available ? "Mark unavailable" : "Mark available"}
                </button>
                <button className={styles.smallDangerBtn} onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {!menuLoading && visibleItems.length === 0 && <p>No online menu items found. Run `supabase_seed.sql` once in Supabase.</p>}
      </div>
    </div>
  );
}
