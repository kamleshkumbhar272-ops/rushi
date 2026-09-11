// Deprecated: menu data is now stored in Supabase.
// Kept as a small compatibility file so older imports do not crash if they
// are introduced by a future component. The live app does not use these
// functions as its source of truth.
export function loadStoredMenuItems() {
  return null;
}

export function saveStoredMenuItems() {
  return true;
}

export function clearStoredMenuItems() {
  // Intentionally empty. Supabase owns the menu data now.
}
