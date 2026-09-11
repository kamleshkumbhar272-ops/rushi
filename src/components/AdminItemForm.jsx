import { useState, useEffect } from "react";
import styles from "../pages/AdminPanel.module.css";
import { fileToCompressedDataUrl } from "../utils/imageUpload";

const emptyForm = {
  category: "",
  nameEn: "",
  nameHi: "",
  price: "",
  description: "",
  image: null,
  available: true,
};

export default function AdminItemForm({ categoryKeys, categoryMeta, initial, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [imageError, setImageError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        category: initial.category,
        nameEn: initial.name.en,
        nameHi: initial.name.hi,
        price: initial.price,
        description: initial.description || "",
        image: initial.image || null,
        available: initial.available,
      });
    } else {
      setForm({ ...emptyForm, category: categoryKeys[0] || "" });
    }
    setSaveError("");
  }, [initial, categoryKeys]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      update("image", dataUrl);
    } catch (err) {
      setImageError(err.message || "Could not load image");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nameEn.trim() || !form.category || !form.price.trim()) return;
    setSaving(true);
    setSaveError("");
    try {
      await onSave({
        category: form.category,
        name: { en: form.nameEn.trim(), hi: form.nameHi.trim() },
        price: form.price.trim().startsWith("₹") ? form.price.trim() : `₹${form.price.trim()}`,
        description: form.description.trim(),
        image: form.image,
        available: form.available,
      });
    } catch (err) {
      setSaveError(err.message || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label>
          Item name (English) *
          <input value={form.nameEn} onChange={(e) => update("nameEn", e.target.value)} placeholder="e.g. Paneer Tikka" required />
        </label>
        <label>
          Item name (Hindi)
          <input value={form.nameHi} onChange={(e) => update("nameHi", e.target.value)} placeholder="e.g. पनीर टिक्का" />
        </label>
      </div>

      <div className={styles.formRow}>
        <label>
          Category *
          <select value={form.category} onChange={(e) => update("category", e.target.value)} required>
            {categoryKeys.map((key) => (
              <option key={key} value={key}>{categoryMeta[key]?.icon} {categoryMeta[key]?.label?.en || key}</option>
            ))}
          </select>
        </label>
        <label>
          Price *
          <input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="e.g. 150 or ₹100/120" required />
        </label>
      </div>

      <label className={styles.fullField}>
        Description / details
        <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Short description shown to customers (optional)" rows={2} />
      </label>

      <div className={styles.formRow}>
        <label className={styles.fullField}>
          Photo
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} />
          {imageError && <span className={styles.errorText}>{imageError}</span>}
        </label>
        {form.image && <img src={form.image} alt="preview" className={styles.imagePreview} />}
      </div>

      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={form.available} onChange={(e) => update("available", e.target.checked)} />
        Available to customers
      </label>

      {saveError && <p className={styles.errorText}>{saveError}</p>}

      <div className={styles.formActions}>
        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? "Saving…" : initial ? "Save changes" : "Add item"}
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={onCancel} disabled={saving}>Cancel</button>
      </div>
    </form>
  );
}
