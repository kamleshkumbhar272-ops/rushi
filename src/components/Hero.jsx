import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-ring"></div>
      <div className="hero-sweep"></div>
      <div className="hero-flecks">
        <span className="fleck"></span>
        <span className="fleck"></span>
        <span className="fleck"></span>
        <span className="fleck"></span>
        <span className="fleck"></span>
        <span className="fleck"></span>
      </div>

      <div className="hero-content">
        <p className="hero-subtitle">Welcome To</p>
        <h1 className="hero-title">New Vatika</h1>
        <p className="hero-title-outline">Café</p>
        <p className="hero-description">
          Pure vegetarian comfort food, handcrafted with warmth —
          served in a space as inviting as it looks.
        </p>
        <div className="hero-buttons">
          <Link to="/menu" className="btn-gold">Explore Menu</Link>
          <Link to="/contact" className="btn-outline">Book Table</Link>
        </div>
        <div className="hero-stats">
          <div className="stat"><h3>100+</h3><p>Dishes</p></div>
          <div className="stat"><h3>100%</h3><p>Pure Veg</p></div>
          <div className="stat"><h3>5★</h3><p>Experience</p></div>
          <div className="stat"><h3>₹50+</h3><p>Starting Price</p></div>
        </div>
      </div>

      <div className="scroll-down">Scroll</div>
    </section>
  );
}