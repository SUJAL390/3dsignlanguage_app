import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-brand">
                <div className="brand-icon">🤟</div>
                <h3>MyVoice</h3>
              </div>
              <p className="footer-description">
                Revolutionizing Sign Language learning through AI-powered 3D avatars and modern technology.
              </p>
              <div className="social-links">
                <button className="social-link" title="GitHub" onClick={() => window.open('#')}>
                  <Github size={20} />
                </button>
                <button className="social-link" title="LinkedIn" onClick={() => window.open('#')}>
                  <Linkedin size={20} />
                </button>
                <button className="social-link" title="Twitter" onClick={() => window.open('#')}>
                  <Twitter size={20} />
                </button>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/sign-kit/home">Home</Link></li>
                <li><Link to="/sign-kit/learn-sign">Learn Sign</Link></li>
                <li><Link to="/sign-kit/convert">Convert</Link></li>
                <li><Link to="/sign-kit/all-videos">Videos</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <a href="mailto:info@signkit.com">info@MyVoice.com</a>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href="tel:+91-XXXXXXXXXX">+977-XXXXXXXXXX</a>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Nepal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} MyVoice. Made with <Heart size={16} className="heart-icon" /> for the deaf community.
            </p>
            <p className="footer-credits">
              Bridging communication gaps through technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;