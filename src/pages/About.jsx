import SectionTitle from '../components/SectionTitle';
import '../pages/About.css';

export default function About() {
  return (
    <section className="about-section">
      <SectionTitle
        label="Our Story"
        title="About New Vatika Café"
        sub="Established in 2026"
      />

      <div className="about-divider" />

      <div className="about-content">
        <p>
          Established in 2026, New Vatika Café is a modern vegetarian café in
          the heart of Hingoli, Maharashtra, created with one simple goal —
          to serve delicious food, refreshing beverages, and memorable
          experiences in a warm and welcoming atmosphere.
        </p>

        <p>
          Our menu brings together a wide variety of flavors under one roof.
          Whether you're craving spicy Chinese dishes, cheesy pizzas, juicy
          burgers, crispy sandwiches, creamy pasta, flavorful momos, or
          comforting Maggi, there's something for everyone. We also serve
          handcrafted mocktails, refreshing cold coffees, premium shakes, and
          a selection of beverages to perfectly complement your meal.
        </p>

        <p>
          Every dish is prepared using fresh ingredients, quality vegetables,
          and carefully selected seasonings to ensure great taste and
          consistent quality. From our signature Vatika Special Pizza, Vatika
          Special Burger, Vatika Special Pasta, and Vatika Special Rice to
          our delicious Chinese specialties and indulgent desserts and
          drinks, every item is made with care and attention to detail.
        </p>
      </div>
    </section>
  );
}