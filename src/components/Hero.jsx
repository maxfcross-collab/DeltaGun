function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-glow"></div>

      <div className="hero-content">

        {/* Small Brand Badge */}
        <span className="hero-label">
          <i className="bi bi-shield-check"></i>
          PRECISION
          <span>•</span>
          QUALITY
          <span>•</span>
          PERFORMANCE
        </span>

        {/* Main Heading */}
        <h1>
          DELTA GUN
        </h1>

        {/* Description */}
        <p>
          Discover a premium collection of quality firearms
          and tactical gear, presented for enthusiasts who
          value precision, reliability and performance.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">

          <a href="#products" className="btn-primary">
            <i className="bi bi-grid-3x3-gap"></i>
            Explore Collection
            <i className="bi bi-arrow-right"></i>
          </a>

          <a href="#contact" className="btn-secondary">
            <i className="bi bi-chat-dots"></i>
            Contact Us
          </a>

        </div>

        {/* Trust Indicators */}
        <div className="hero-trust">

          <div className="trust-item">
            <i className="bi bi-patch-check"></i>
            <span>Quality Focused</span>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <i className="bi bi-bullseye"></i>
            <span>Precision Driven</span>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <i className="bi bi-star"></i>
            <span>Premium Selection</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;