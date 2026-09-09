// Generates a tasteful placeholder "photo" (an SVG data URI) for menu
// items that don't have a real uploaded photo yet. Keeps the menu grid
// looking finished even before the owner has uploaded real photos, and
// needs no network request (works fully offline).

const PALETTE = [
  ["#8B5E3C", "#5C3A21"],
  ["#6F4E37", "#4B3222"],
  ["#A67C52", "#6F4E37"],
  ["#9C7A2B", "#6F4E37"],
];

function pickGradient(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export function getPlaceholderImage(icon, seedText = "") {
  const [c1, c2] = pickGradient(seedText || icon || "menu");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="16" fill="url(#g)"/>
      <text x="50%" y="54%" font-size="64" text-anchor="middle" dominant-baseline="middle">${icon || "🍽️"}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
