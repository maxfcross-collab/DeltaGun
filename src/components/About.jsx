import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* =========================
          ABOUT HERO
      ========================== */}
      <section className="about-hero">
        <div className="about-hero-content">

          <span className="about-label">
            ABOUT DELTA GUN
          </span>

          <h1>
            Quality. Precision. Confidence.
          </h1>

          <p className="about-intro">
            Delta Gun is dedicated to presenting a carefully selected
            range of firearms and tactical equipment for enthusiasts
            who appreciate quality, precision and professional
            presentation.
          </p>

          <p className="about-intro secondary">
            Our goal is to provide customers with clear information
            and a simple way to connect with our team for product
            details and general inquiries.
          </p>

          <div className="about-hero-actions">
            <Link to="/products" className="btn-primary">
              <i className="bi bi-grid"></i>
              Explore Collection
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/contact" className="about-outline-btn">
              <i className="bi bi-chat-dots"></i>
              Contact Us
            </Link>
          </div>

        </div>
      </section>


      {/* =========================
          BRAND VALUES
      ========================== */}
      <section className="about-values-section">

        <div className="about-section-heading">
          <span>WHAT WE STAND FOR</span>

          <h2>
            Built Around Quality &amp; Precision
          </h2>

          <p>
            Every part of the Delta Gun experience is designed
            around clear information, professional presentation
            and customer convenience.
          </p>
        </div>


        <div className="about-values">

          {/* Quality */}
          <div className="about-value">
            <div className="about-value-icon">
              <i className="bi bi-patch-check"></i>
            </div>

            <div>
              <h3>Quality Focused</h3>

              <p>
                Carefully presented selections with attention
                to quality, design and detail.
              </p>
            </div>
          </div>


          {/* Precision */}
          <div className="about-value">
            <div className="about-value-icon">
              <i className="bi bi-bullseye"></i>
            </div>

            <div>
              <h3>Precision Driven</h3>

              <p>
                Clear and professional information designed
                to help customers explore available options.
              </p>
            </div>
          </div>


          {/* Contact */}
          <div className="about-value">
            <div className="about-value-icon">
              <i className="bi bi-chat-dots"></i>
            </div>

            <div>
              <h3>Easy Contact</h3>

              <p>
                A simple and convenient way to connect with
                our team for more information.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* =========================
          WHY DELTA GUN
      ========================== */}
      <section className="about-why-section">

        <div className="about-why-content">

          <div className="about-why-text">

            <span className="about-small-label">
              WHY DELTA GUN
            </span>

            <h2>
              A Professional Way to Explore Our Collection
            </h2>

            <p>
              Delta Gun focuses on creating a straightforward
              experience where visitors can explore our featured
              collections and easily find additional information.
            </p>

            <p>
              From tactical collections to premium gear and
              featured selections, our presentation is built to
              make browsing simple, clear and professional.
            </p>


            <div className="about-check-list">

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Clear product presentation</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Professional collection categories</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Simple customer communication</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Quality-focused presentation</span>
              </div>

            </div>

          </div>


          {/* Visual Information Card */}
          <div className="about-why-card">

            <div className="about-why-card-icon">
              <i className="bi bi-award"></i>
            </div>

            <span>DELTA GUN</span>

            <h3>
              Quality. Precision. Performance.
            </h3>

            <p>
              Professional presentation of selected firearms
              and tactical equipment for enthusiasts.
            </p>

            <div className="about-card-divider"></div>

            <div className="about-card-meta">
              <div>
                <strong>01</strong>
                <span>Quality</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Precision</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Service</span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          HIGHLIGHTS
      ========================== */}
      <section className="about-highlights">

        <div className="about-section-heading">
          <span>DELTA GUN EXPERIENCE</span>

          <h2>
            Designed For A Better Experience
          </h2>

          <p>
            We keep the experience simple, professional and
            focused on what matters most.
          </p>
        </div>


        <div className="about-highlight-grid">

          <div className="about-highlight-card">
            <div className="highlight-number">01</div>

            <i className="bi bi-grid-3x3-gap"></i>

            <h3>Curated Collections</h3>

            <p>
              Explore carefully presented collections organized
              for a simple browsing experience.
            </p>
          </div>


          <div className="about-highlight-card">
            <div className="highlight-number">02</div>

            <i className="bi bi-info-circle"></i>

            <h3>Clear Information</h3>

            <p>
              Find straightforward information about our
              collections and available options.
            </p>
          </div>


          <div className="about-highlight-card">
            <div className="highlight-number">03</div>

            <i className="bi bi-headset"></i>

            <h3>Customer Support</h3>

            <p>
              Get in touch with our team whenever you need
              additional information or assistance.
            </p>
          </div>


          <div className="about-highlight-card">
            <div className="highlight-number">04</div>

            <i className="bi bi-stars"></i>

            <h3>Professional Presentation</h3>

            <p>
              A clean and modern presentation built around
              quality, precision and attention to detail.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="about-cta">

        <div className="about-cta-content">

          <span>
            READY TO EXPLORE?
          </span>

          <h2>
            Discover The Delta Gun Collection
          </h2>

          <p>
            Explore our featured collections or contact our
            team for more information.
          </p>

          <div className="about-cta-buttons">

            <Link to="/products" className="btn-primary">
              <i className="bi bi-grid"></i>
              Shop All
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/contact" className="about-cta-outline">
              <i className="bi bi-chat-text"></i>
              Get In Touch
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;