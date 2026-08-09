function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <a href="#home" className="footer-logo">
            <img
              src="/logo.png"
              alt="Delta Gun Logo"
            />

            <span>DELTA GUN</span>
          </a>

          <p>
            Quality. Precision. Performance.
          </p>

          <p className="footer-description">
            Professional presentation of quality firearms
            and tactical equipment for enthusiasts.
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h4>Quick Links</h4>

          <div className="footer-links">
            <a href="#home">
              Home
            </a>

            <a href="#products">
              Collection
            </a>

            <a href="#about">
              About
            </a>

            <a href="#contact">
              Contact
            </a>
          </div>

        </div>


        {/* Contact */}
        <div className="footer-column">

          <h4>Contact</h4>

          <div className="footer-contact">

            <a href="tel:+923001234567">
              <i className="bi bi-telephone-fill"></i>
              <span>+92 313 1555 111</span>
            </a>

            <a href="mailto:info@deltagun.com">
              <i className="bi bi-envelope-fill"></i>
              <span>deltagun@gmail.com</span>
            </a>

            <a href="#contact">
              <i className="bi bi-geo-alt-fill"></i>
              <span>Visit Our Shop</span>
            </a>

          </div>

        </div>


        {/* Social Media */}
        <div className="footer-column">

          <h4>Follow Us</h4>

          <div className="footer-social">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="bi bi-youtube"></i>
            </a>

            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>

          </div>

        </div>

      </div>


      {/* Footer Bottom */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Delta Gun. All rights reserved.
        </p>

        <a href="#home">
          Back to top
          <i className="bi bi-arrow-up"></i>
        </a>

      </div>

    </footer>
  );
}

export default Footer;



