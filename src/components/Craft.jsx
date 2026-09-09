import SectionTitle from "./SectionTitle";
import { CRAFT_ITEMS } from "../data";
import "./Craft.css";

export default function Craft() {
  return (
    <section id="craft" className="craft-section">
      <SectionTitle
        label="What We Offer"
        title="Our Culinary Craft"
        sub="Every dish is a story of tradition, technique, and the finest ingredients — curated for those who seek more than a meal."
      />

      <div className="craft-grid">
        {CRAFT_ITEMS.map(({ id, icon: Icon, title, description }) => (
          <article className="craft-item fade-in" key={id}>
            <div className="craft-icon">
              <Icon />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}