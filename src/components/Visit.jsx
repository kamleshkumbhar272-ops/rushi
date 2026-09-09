import SectionTitle from './SectionTitle';
import { VISIT_INFO, MAP_EMBED_URL } from '../data';
import './Visit.css';

export default function Visit() {
  return (
    <section id="visit" className="visit-section">
      <SectionTitle
        label="Find Us"
        title="Visit Us"
        sub="Our Location & Hours"
      />

      <div className="visit-grid">
        {/* Map */}
        <div className="map-frame fade-in">
          <div className="map-frame-label">📍 New Vatika Café</div>
          <iframe
            src={MAP_EMBED_URL}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="New Vatika Café Location"
          />
        </div>

        {/* Info */}
        <div className="visit-info fade-in">
          <h2>
            Our Location
            <br />
            &amp; Hours
          </h2>
          <div className="visit-gold-line" />

          {VISIT_INFO.map(({ icon, title, lines }) => (
            <div className="visit-row" key={title}>
              <div className="visit-icon">{icon}</div>
              <div className="visit-row-text">
                <h4>{title}</h4>
                <p>
                  {lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}

          <a href="tel:+91-0000000000" className="visit-cta">
            Get Directions →
          </a>
        </div>
      </div>
    </section>
  );
}
