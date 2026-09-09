import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '../data';
import './Navbar.css';
import logo from '../assets/images/logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('');
  const location                  = useLocation();

  // Highlight nav link based on scroll position (home page only)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
      const y = window.scrollY + 100;
      sections.forEach((sec) => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
          setActiveId(sec.id);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav className="navbar">
        {/* Logo */}
       <img src={logo} alt="New Vatika Café" className="nav-logo-img" />

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                to={href}
                className={activeId && href === `#${activeId}` ? 'active' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="nav-cta">
              Book a Table
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}
