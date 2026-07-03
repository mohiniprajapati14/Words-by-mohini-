import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer section py-5">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <div className="logo-container mb-3">
            <Link to="/">
              <img src="/logo.jpg" alt="Words by Mohini" className="logo-image" style={{ height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
            </Link>
            <div className="logo-text">
              <span className="logo text-lg">WORDS BY MOHINI</span>
            </div>
          </div>
          <p className="text-xs text-gold mb-3">Content Writer | Creative Writer</p>
          <p className="text-xs text-muted mb-4">Helping businesses grow with engaging content, creative narratives, and reliable virtual support. Quality work, on-time delivery and 100% client satisfaction is my promise.</p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4 className="text-gold mb-3 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="text-gold mb-3 uppercase tracking-wider text-sm">Categories</h4>
          <ul className="footer-links">
            <li><Link to="/category/Poems">Poems</Link></li>
            <li><Link to="/category/Short Stories">Short Stories</Link></li>
            <li><Link to="/category/Blogs">Blogs</Link></li>
            <li><Link to="/category/Articles">Articles</Link></li>
            <li><Link to="/category/Content Writing">Content Writing</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="text-gold mb-3 uppercase tracking-wider text-sm">Connect With Me</h4>
          <ul className="footer-contact">
            <li><Link to="/contact" style={{color: 'inherit', textDecoration: 'none'}}><i className="fa-solid fa-envelope text-gold"></i> Send a Message</Link></li>
            <li><Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}><i className="fa-solid fa-lock text-gold"></i> Admin Login</Link></li>
            <li><i className="fa-solid fa-location-dot text-gold"></i> India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center mt-5 pt-3 border-t border-gray-800">
        <p className="text-xs text-muted">&copy; 2024 Words By Mohini. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
