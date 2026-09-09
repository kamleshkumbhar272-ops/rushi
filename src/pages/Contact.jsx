import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-container">

        <div className="contact-header">
          <p className="contact-subtitle">Visit Us</p>
          <h1>Contact New Vatika Café</h1>
          <p>
            We'd love to welcome you. Visit us for delicious food,
            refreshing beverages, and a warm atmosphere.
          </p>
        </div>

        <div className="contact-grid">

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Our Location</h3>

            <p>
              New Mondha,
              <br />
              In Front of Hanuman Mandir,
              <br />
              Bhatt Colony,
              <br />
              Siddharth Nagar,
              <br />
              Hingoli, Maharashtra 431513
            </p>

            <a
              href="https://maps.app.goo.gl/o7dbJvFtudagA2u17"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon" />
            <h3>Call Us</h3>

            <p>+91 96739 59011</p>

            <a
              href="tel:+919673959011"
              className="contact-btn"
            >
              Call Now
            </a>
          </div>

          <div className="contact-card">
            <FaClock className="contact-icon" />
            <h3>Opening Hours</h3>

            <p>
              Monday - Sunday
              <br />
              8:00 AM – 11:00 PM
            </p>
          </div>

        </div>

        <div className="map-section">
          <iframe
            title="New Vatika Café Location"
            src="https://www.google.com/maps?q=New+Mondha+Hanuman+Mandir+Hingoli&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </div>

      </div>
    </main>
  );
}