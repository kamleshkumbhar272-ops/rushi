import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div className={`mobile-menu${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      <button className="mobile-close" onClick={onClose} aria-label="Close menu">
        ✕
      </button>

      {NAV_LINKS.map(({ label, href }) => (
        <Link key={label} to={href} onClick={onClose}>
          {label}
        </Link>
      ))}

      <Link to="#" className="btn-gold" onClick={onClose}>
        Book a Table
      </Link>
    </div>
  );
}
