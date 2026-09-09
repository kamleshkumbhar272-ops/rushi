/**
 * Reusable section heading.
 *
 * Props:
 * label - Small uppercase heading
 * title - Main section heading
 * sub   - Supporting description
 */

export default function SectionTitle({ label, title, sub }) {
  return (
    <>
      {label && <p className="section-label">{label}</p>}

      {title && <h2 className="section-title">{title}</h2>}

      {sub && <p className="section-sub">{sub}</p>}
    </>
  );
}