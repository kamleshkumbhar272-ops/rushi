// Change this to your own passcode. This is a *basic* client-side gate to
// keep casual visitors out of /admin — it is NOT secure (anyone can read
// this file in the deployed JS bundle). Do not rely on this alone for a
// real production deployment; a real login needs a backend that verifies
// the owner's identity server-side.
export const ADMIN_PASSCODE = "vatika@admin";

export const ADMIN_SESSION_KEY = "vatikaCafe.adminAuthed";
