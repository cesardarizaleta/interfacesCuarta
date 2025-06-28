import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="photography-footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="brand-title">
            <p className="brand-main">PHOTOGRAPHY</p>
            <p className="brand-sub">BY LANDING</p>
          </div>
          <p className="brand-description">Capturing special moments with art and passion.</p>

          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Dribbble">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="section-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                About Me
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="section-title">Services</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Wedding Photography
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Portrait Sessions
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Product Photography
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Corporate Events
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Family Sessions
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Aerial Photography
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="section-title">Contact Us</h3>
          <address className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <span>123 Photography Street, Image City</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
              <a href="tel:+1234567890" className="footer-link">
                +1 234 567 890
              </a>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <a href="mailto:info@landingphotography.com" className="footer-link">
                info@landingphoto.com
              </a>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock contact-icon"></i>
              <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </address>

          {/* Newsletter Subscription */}
          <div className="newsletter">
            <h4 className="newsletter-title">Subscribe to our newsletter</h4>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                aria-label="Email for newsletter subscription"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button" aria-label="Subscribe">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="copyright-section">
        <div className="copyright-container">
          <div className="copyright-text">&copy; {currentYear} Landing Photography. All rights reserved.</div>
          <div className="legal-links">
            <a href="#" className="legal-link">
              Privacy Policy
            </a>
            <a href="#" className="legal-link">
              Terms of Service
            </a>
            <a href="#" className="legal-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
