import { Link } from "react-router-dom";

function Contact() {
  return (
    <main className="contact-page">

      {/* =========================================
          CONTACT HERO
      ========================================= */}
      <section className="contact-hero">
        <div className="contact-hero-content">

          <span className="contact-label">
            CONTACT DELTA GUN
          </span>

          <h1>
            Let's Start a Conversation.
          </h1>

          <p>
            Have a question about our collections or need
            additional information? Our team is here to help
            you with your general inquiries.
          </p>

          <div className="contact-hero-points">

            <span>
              <i className="bi bi-patch-check-fill"></i>
              Professional Support
            </span>

            <span>
              <i className="bi bi-chat-dots-fill"></i>
              Easy Communication
            </span>

            <span>
              <i className="bi bi-envelope-check-fill"></i>
              Quick Response
            </span>

          </div>

        </div>
      </section>


      {/* =========================================
          CONTACT MAIN
      ========================================= */}
      <section className="contact-section">

        <div className="contact-container">


          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}
          <div className="contact-info-header">

            <span>GET IN TOUCH</span>

            <h2>
              We're Here to Help
            </h2>

            <p>
              Choose your preferred way to contact the
              Delta Gun team. We are happy to assist with
              general information and inquiries.
            </p>

          </div>


          <div className="contact-info-grid">

            {/* Phone */}
            <div className="contact-info-card">

              <div className="contact-info-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>

              <div>
                <span className="contact-card-label">
                  CALL US
                </span>

                <h3>Phone</h3>

                <a href="tel:+923131555111">
                  +92 313 1555 111
                </a>

                <p>
                  Available for general inquiries and
                  information.
                </p>
              </div>

            </div>


            {/* Email */}
            <div className="contact-info-card">

              <div className="contact-info-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>

              <div>
                <span className="contact-card-label">
                  EMAIL US
                </span>

                <h3>Email</h3>

                <a href="mailto:deltagun@gmail.com">
                  deltagun@gmail.com
                </a>

                <p>
                  Send us your questions and we'll get
                  back to you.
                </p>
              </div>

            </div>


            {/* Address */}
            <div className="contact-info-card">

              <div className="contact-info-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <div>
                <span className="contact-card-label">
                  VISIT US
                </span>

                <h3>Shop Address</h3>

                <p>
                  Shop No. 26 Salma Plaza Ground Floor,
                  Mir Karam Ali Talpur Road Near Lucky Star.
                </p>

              </div>

            </div>

          </div>


          {/* =====================================
              CONTACT FORM AREA
          ===================================== */}
          <div className="contact-content-grid">


            {/* Left Information */}
            <div className="contact-form-intro">

              <span className="contact-form-label">
                SEND A MESSAGE
              </span>

              <h2>
                Have a Question?
              </h2>

              <p>
                Fill out the form and send your inquiry
                directly to our team. Please provide
                accurate information so we can respond
                appropriately.
              </p>


              <div className="contact-benefits">

                <div>
                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Clear and professional communication
                  </span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    General product information
                  </span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Easy contact process
                  </span>
                </div>

              </div>


              <div className="contact-mini-card">

                <div className="contact-mini-icon">
                  <i className="bi bi-headset"></i>
                </div>

                <div>
                  <strong>
                    Need direct assistance?
                  </strong>

                  <span>
                    Call us at +92 313 1555 111
                  </span>
                </div>

              </div>

            </div>


            {/* Contact Form */}
            <div className="contact-form-wrapper">

              <form
                className="contact-form"
                onSubmit={(e) => e.preventDefault()}
              >

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Your Email
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="What would you like to ask?"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Your Message
                  </label>

                  <textarea
                    placeholder="Write your message here..."
                    rows="7"
                  ></textarea>

                </div>


                <button
                  type="submit"
                  className="btn-primary contact-submit-btn"
                >
                  <span>Send Message</span>

                  <i className="bi bi-send-fill"></i>

                </button>

              </form>

            </div>

          </div>


          {/* =====================================
              SOCIAL MEDIA
          ===================================== */}
          <div className="social-section">

            <span>
              FOLLOW DELTA GUN
            </span>

            <h3>
              Connect With Us
            </h3>

            <p>
              Stay connected with Delta Gun through our
              social channels.
            </p>


            <div className="social-links">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>


              {/* Instagram */}
              <a
                href="https://www.instagram.com/deltagun.pk?igsh=NjQxeDkzMTBiOWYz"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>


              {/* YouTube */}
              <a
                href="https://youtube.com/@deltagun-07?si=I0RiqKZ7CpPPG7wT"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>


              {/* WhatsApp */}
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


          {/* =====================================
              BACK HOME
          ===================================== */}
          <div className="contact-home-link">

            <Link
              to="/"
              className="back-home-btn"
            >
              <i className="bi bi-arrow-left"></i>

              <span>
                Back to Home
              </span>

              <i className="bi bi-house-door-fill back-home-icon"></i>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;