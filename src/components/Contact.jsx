function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Heading */}
        <div className="contact-heading">
          <span>CONTACT US</span>

          <h2>Have a Question?</h2>

          <p>
            Get in touch with our team for more information,
            product details, or general inquiries.
          </p>
        </div>

        {/* Contact Information */}
        <div className="contact-info-grid">

          {/* Phone */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <i className="bi bi-telephone-fill"></i>
            </div>

            <div>
              <h3>Phone</h3>
              <a href="tel:+923131555111">
                +92 313 1555 111
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>

            <div>
              <h3>Email</h3>
              <a href="mailto:deltagun@gmail.com">
                deltagun@gmail.com
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>

            <div>
              <h3>Shop Address</h3>
              <p>
                Shop No. 26 Salma Plaza Ground Floor Mir Karam Ali Talpur Road Near Lucky Star
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">

          <form className="contact-form">

            <div className="form-row">

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Your Email"
              />

            </div>

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message"
              rows="6"
            ></textarea>

            <button type="submit" className="btn-primary">
              Send Message
              <i className="bi bi-send-fill"></i>
            </button>

          </form>

        </div>

        {/* Social Media */}
        <div className="social-section">

          <span>FOLLOW DELTA GUN</span>

          <h3>Connect With Us</h3>

          <div className="social-links">

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
    </section>
  );
}

export default Contact;