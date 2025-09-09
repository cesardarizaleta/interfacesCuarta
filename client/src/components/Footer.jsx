import { useState, useEffect } from "react"
import { useColors } from "../contexts/ColorContext"

const Footer = () => {
  const { activePalette, activePaletteId } = useColors()
  const [forceUpdate, setForceUpdate] = useState(0)

  // Forzar actualización cuando cambia la paleta
  useEffect(() => {
    if (activePaletteId) {
      setTimeout(() => {
        setForceUpdate(prev => prev + 1)
      }, 50)
    }
  }, [activePaletteId])
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <>
      <style>
        {`
          .newsletter-input::placeholder {
            color: ${activePalette?.colors?.text || '#78716C'} !important;
            opacity: 0.6 !important;
          }
        `}
      </style>
      <footer
        key={`footer-${forceUpdate}`}
        className="photography-footer"
        style={{ backgroundColor: activePalette?.colors?.neutral || '#E7E5E4' }}
      >
      {/* Main Footer Content */}
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="brand-title">
            <p
              className="brand-main"
              style={{ color: activePalette?.colors?.accent || '#44403C' }}
            >
              PHOTOGRAPHY
            </p>
            <p
              className="brand-sub"
              style={{ color: activePalette?.colors?.primary || '#57534E' }}
            >
              BY LANDING
            </p>
          </div>
          <p
            className="brand-description"
            style={{ color: activePalette?.colors?.text || '#78716C' }}
          >
            Capturing special moments with art and passion.
          </p>

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
          <h3
            className="section-title"
            style={{ color: activePalette?.colors?.accent || '#44403C' }}
          >
            Quick Links
          </h3>
          <ul className="footer-links">
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3
            className="section-title"
            style={{ color: activePalette?.colors?.accent || '#44403C' }}
          >
            Services
          </h3>
          <ul className="footer-links">
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Wedding Photography
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Portrait Sessions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Product Photography
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Corporate Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Family Sessions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Aerial Photography
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3
            className="section-title"
            style={{ color: activePalette?.colors?.accent || '#44403C' }}
          >
            Contact Us
          </h3>
          <address className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <span style={{ color: activePalette?.colors?.text || '#78716C' }}>
                123 Photography Street, Image City
              </span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
              <a
                href="tel:+1234567890"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                +1 234 567 890
              </a>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <a
                href="mailto:info@landingphotography.com"
                className="footer-link"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                info@landingphoto.com
              </a>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock contact-icon"></i>
              <span style={{ color: activePalette?.colors?.text || '#78716C' }}>
                Mon-Fri: 9:00 AM - 6:00 PM
              </span>
            </div>
          </address>

          {/* Newsletter Subscription */}
          <div className="newsletter">
            <h4
              className="newsletter-title"
              style={{ color: activePalette?.colors?.accent || '#44403C' }}
            >
              Subscribe to our newsletter
            </h4>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                aria-label="Email for newsletter subscription"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  color: activePalette?.colors?.text || '#78716C',
                  backgroundColor: activePalette?.colors?.secondary || '#ffffff',
                  borderColor: activePalette?.colors?.neutral || '#d6d3d1'
                }}
                required
              />
              <button
                type="submit"
                className="newsletter-button"
                aria-label="Subscribe"
                style={{
                  backgroundColor: activePalette?.colors?.primary || '#57534E',
                  color: activePalette?.colors?.secondary || '#ffffff'
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div
        className="copyright-section"
        style={{ backgroundColor: activePalette?.colors?.neutral || '#E7E5E4' }}
      >
        <div className="copyright-container">
          <div
            className="copyright-text"
            style={{ color: activePalette?.colors?.text || '#78716C' }}
          >
            &copy; {currentYear} Landing Photography. All rights reserved.
          </div>
          <div className="legal-links">
            <a
              href="#"
              className="legal-link"
              style={{ color: activePalette?.colors?.text || '#78716C' }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="legal-link"
              style={{ color: activePalette?.colors?.text || '#78716C' }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="legal-link"
              style={{ color: activePalette?.colors?.text || '#78716C' }}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}

export default Footer
