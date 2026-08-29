import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Products from "../components/Products";

function Home() {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <Hero />

      {/* =========================
          PRODUCTS / COLLECTIONS
      ========================= */}
      <Products />

      {/* =========================
          WHY DELTA GUN
      ========================= */}
      <section className="home-features-section">
        <div className="home-container">

          <div className="home-section-heading">
            <span>WHY DELTA GUN</span>

            <h2>Built Around Quality & Precision</h2>

            <p>
              Discover a carefully presented collection with a focus on
              quality, precision, performance and professional presentation.
            </p>
          </div>

          <div className="home-features-grid">

            {/* Feature 1 */}
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-award-fill"></i>
              </div>

              <h3>Quality Focused</h3>

              <p>
                We present our collection with attention to quality,
                craftsmanship and professional standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-crosshair2"></i>
              </div>

              <h3>Precision</h3>

              <p>
                Explore a collection presented around precision, detail
                and dependable performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <h3>Professional</h3>

              <p>
                Every collection is presented with a clean, modern and
                professional approach.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="bi bi-stars"></i>
              </div>

              <h3>Premium Experience</h3>

              <p>
                A refined browsing experience designed for enthusiasts
                who value quality and attention to detail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          BRAND INTRODUCTION
      ========================= */}
      <section className="home-brand-section">
        <div className="home-container">

          <div className="home-brand-content">

            <div className="home-brand-label">
              DELTA GUN
            </div>

            <h2>
              Quality. Precision.
              <br />
              Performance.
            </h2>

            <p>
              Delta Gun brings together carefully presented collections
              focused on quality, design and professional presentation.
              Explore our collections and discover more about what we offer.
            </p>

            <div className="home-brand-actions">
              <Link to="/products" className="home-btn-primary">
                Explore Collection
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/about" className="home-btn-outline">
                About Delta Gun
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

          </div>

          <div className="home-brand-highlight">

            <div className="brand-highlight-item">
              <i className="bi bi-check-circle-fill"></i>

              <div>
                <strong>Quality Focused</strong>
                <span>Carefully presented collections</span>
              </div>
            </div>

            <div className="brand-highlight-item">
              <i className="bi bi-check-circle-fill"></i>

              <div>
                <strong>Professional Presentation</strong>
                <span>Clean and modern experience</span>
              </div>
            </div>

            <div className="brand-highlight-item">
              <i className="bi bi-check-circle-fill"></i>

              <div>
                <strong>Customer Support</strong>
                <span>We're here to help with inquiries</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          CTA SECTION
      ========================= */}
      <section className="home-cta-section">
        <div className="home-cta-content">

          <span>EXPLORE DELTA GUN</span>

          <h2>Looking For More Information?</h2>

          <p>
            Explore our collections or get in touch with our team
            for more information and general inquiries.
          </p>

          <div className="home-cta-buttons">

            <Link to="/products" className="home-cta-primary">
              Shop All
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/contact" className="home-cta-secondary">
              Contact Us
              <i className="bi bi-chat-dots"></i>
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}

export default Home;