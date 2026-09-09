import { useState, useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle';
import { TESTIMONIALS } from '../data';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);
  const timerRef              = useRef(null);

  const goTo = (index) => {
    setFading(true);
    setTimeout(() => {
      setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length);
      setFading(false);
    }, 200);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const { text, author, role, stars } = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="testimonials-section">
      <SectionTitle
        label="Guest Stories"
        title="Testimonials"
        sub="Words from the people who matter most — our guests."
      />

      <div className="testimonial-slider">
        <button className="testimonial-nav t-prev" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="testimonial-nav t-next" onClick={next} aria-label="Next">
          ›
        </button>

        <div className={`testimonial-card${fading ? ' fading' : ''}`}>
          <div className="testimonial-stars">{stars}</div>
          <p className="testimonial-text">{text}</p>
          <div className="testimonial-author">{author}</div>
          <div className="testimonial-role">{role}</div>
        </div>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
