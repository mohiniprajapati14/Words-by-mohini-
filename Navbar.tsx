import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src="/logo.jpg" alt="Words by Mohini" className="logo-image" style={{ height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
        </Link>
        <div className="logo-text">
          <Link to="/" className="logo">WORDS BY MOHINI</Link>
          <span className="logo-sub">CONTENT WRITER & CREATIVE WRITER</span>
        </div>
      </div>
      <button className="menu-btn" aria-label="Toggle menu" onClick={() => setIsOpen(!isOpen)}>
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>HOME</Link></li>
        <li><Link to="/blog" onClick={() => setIsOpen(false)}>BLOG</Link></li>
        {isHome && (
          <>
            <li><a href="#about" onClick={() => setIsOpen(false)}>ABOUT</a></li>
            <li><a href="#services" onClick={() => setIsOpen(false)}>SERVICES</a></li>
          </>
        )}
        {!isHome && (
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link></li>
        )}
        {isHome && (
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link></li>
        )}
        <li className="mobile-only-btn"><Link to="/contact" className="btn btn-outline btn-nav" onClick={() => setIsOpen(false)}>HIRE ME <i className="fa-solid fa-chevron-right"></i></Link></li>
      </ul>
      <Link to="/contact" className="btn btn-outline btn-nav desktop-only-btn">HIRE ME <i className="fa-solid fa-chevron-right"></i></Link>
    </nav>
  );
}
