import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="dg-footer">
      <div className="dg-footer-inner">
        {/* Brand */}
        <div className="dg-footer-brand">
          <Link to="/" className="dg-footer-logo">
            <span className="dg-footer-logo-box">
              <img src="/logo.png" alt="Delta Gun Logo" />
            </span>
            <span className="dg-footer-logo-text">
              <strong>DELTA GUN</strong>
              <small>PRECISION SHOWROOM</small>
            </span>
          </Link>

          <p>
            Professional presentation of quality firearms and tactical
            equipment for enthusiasts.
          </p>

          <p className="dg-footer-note">
            * Strictly compliant with valid arms license regulations.
          </p>
        </div>

        {/* Navigation */}
        <div className="dg-footer-col">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Shop All</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact */}
        <div className="dg-footer-col">
          <h4>Showroom Desk</h4>

          <a href="tel:+923131555111" className="dg-footer-contact">
            <i className="bi bi-telephone-fill"></i>
            <span>+92 313 1555 111</span>
          </a>

          <a href="mailto:deltagun@gmail.com" className="dg-footer-contact">
            <i className="bi bi-envelope-fill"></i>
            <span>deltagun@gmail.com</span>
          </a>

          <Link to="/contact" className="dg-footer-contact">
            <i className="bi bi-geo-alt-fill"></i>
            <span>Visit Our Shop, Karachi</span>
          </Link>
        </div>

        {/* Social */}
        <div className="dg-footer-col">
          <h4>Follow Us</h4>

          <div className="dg-footer-social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              href="https://www.instagram.com/deltagun.pk?igsh=NjQxeDkzMTBiOWYz"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://youtube.com/@deltagun-07?si=I0RiqKZ7CpPPG7wT"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="bi bi-youtube"></i>
            </a>

            <a
              href="https://whatsapp.com/channel/0029Vb7ipGg6LwHdZVzvTj3i"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="dg-footer-bottom">
        <p>© {new Date().getFullYear()} Delta Gun. All rights reserved. Karachi, Pakistan.</p>

        <button type="button" onClick={scrollTop}>
          Back to Top
          <i className="bi bi-arrow-up"></i>
        </button>
      </div>
    </footer>
  );
}

export default Footer;