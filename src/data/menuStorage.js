// -----------------------------------------------------------------------
// Menu storage layer
// -----------------------------------------------------------------------
// This project has NO backend / database. It's a static Vite site
// (see the "homepage": "...github.io" + "deploy": "gh-pages" in
// package.json) — there is no server to talk to.
//
// So, for now, the Admin Panel's changes are persisted to the browser's
// localStorage. That means:
//   ✅ Changes made by the owner immediately update the customer Menu
//      IN THE SAME BROWSER (this satisfies "one data source" — Admin
//      Panel, Menu, and Cart all read from this same store).
//   ❌ localStorage is per-browser/per-device. It does NOT sync across
//      the owner's phone, laptop, and a customer's phone. It is NOT a
//      real multi-device production database.
//
// To make this production-ready for real multi-device use, swap the two
// functions below for calls to a real backend (Node/Express + a database,
// Firebase, Supabase, etc.) — everything else in the app (MenuContext,
// AdminPanel, Menu page, Cart) is already written against this module's
// interface, so nothing else needs to change.
// -----------------------------------------------------------------------

const STORAGE_KEY = "vatikaCafe.menuItems.v1";

export function loadStoredMenuItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (err) {
    console.warn("Could not read stored menu data, using defaults.", err);
    return null;
  }
}

export function saveStoredMenuItems(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (err) {
    console.warn("Could not save menu data (storage full or blocked).", err);
    return false;
  }
}

export function clearStoredMenuItems() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
}
