function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">

        {/* Section Label */}
        <span className="about-label">
          ABOUT DELTA GUN
        </span>

        {/* Main Heading */}
        <h2>
          Quality. Precision. Confidence.
        </h2>

        {/* Introduction */}
        <p>
          Delta Gun is dedicated to presenting a carefully
          selected range of firearms and tactical equipment
          for enthusiasts who appreciate quality,
          precision and professional presentation.
        </p>

        <p>
          Our goal is to provide customers with clear
          information and a simple way to get in touch
          with our team for product details and general
          inquiries.
        </p>

        {/* Brand Values */}
        <div className="about-values">

          {/* Quality */}
          <div className="about-value">
            <div className="about-value-icon">
              <i className="bi bi-patch-check"></i>
            </div>

            <div>
              <h3>Quality Focused</h3>
              <p>
                Carefully presented selections with
                attention to quality and detail.
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
                Clear and professional information
                designed to help customers explore
                available options.
              </p>
            </div>
          </div>

          {/* Customer Support */}
          <div className="about-value">
            <div className="about-value-icon">
              <i className="bi bi-chat-dots"></i>
            </div>

            <div>
              <h3>Easy Contact</h3>
              <p>
                A simple way to connect with our
                team for more information.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="btn-primary about-button"
        >
          <i className="bi bi-chat-text"></i>
          Get In Touch
          <i className="bi bi-arrow-right"></i>
        </a>

      </div>
    </section>
  );
}

export default About;