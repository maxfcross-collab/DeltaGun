import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { defaultSiteContent } from "../lib/siteContent";
import "./Contact.css";

function Contact() {
  const [content, setContent] = useState(defaultSiteContent.contact);

  useEffect(() => {
    const fetchContactContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("content_key", "contact")
        .eq("is_published", true)
        .maybeSingle();

      if (!error && data?.content) {
        setContent((previous) => ({
          ...previous,
          ...data.content,
        }));
      }
    };

    fetchContactContent();
  }, []);

  return (
    <div className="ct-page">
      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <span className="ct-pill">
            <span className="ct-pill-dot"></span>
            {content.heroLabel}
          </span>

          <h1>{content.heroTitle}</h1>

          <p>{content.heroDescription}</p>

          <div className="ct-points">
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

      {/* INFO CARDS */}
      <section className="ct-section">
        <div className="ct-container">
          <div className="ct-head">
            <span className="ct-eyebrow">{content.infoLabel}</span>
            <h2>{content.infoTitle}</h2>
            <p>{content.infoDescription}</p>
          </div>

          <div className="ct-info-grid">
            <div className="ct-info-card">
              <div className="ct-info-top">
                <span className="ct-info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <span className="ct-card-label">CALL US</span>
              </div>

              <h3>Phone</h3>

              <a href={`tel:${(content.phone || "").replace(/\s/g, "")}`}>
                {content.phone}
              </a>

              <p>Available for general inquiries and information.</p>
            </div>

            <div className="ct-info-card">
              <div className="ct-info-top">
                <span className="ct-info-icon">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <span className="ct-card-label">EMAIL US</span>
              </div>

              <h3>Email</h3>

              <a href={`mailto:${content.email}`}>{content.email}</a>

              <p>Send us your questions and we'll get back to you.</p>
            </div>

            <div className="ct-info-card">
              <div className="ct-info-top">
                <span className="ct-info-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <span className="ct-card-label">VISIT US</span>
              </div>

              <h3>Shop Address</h3>

              <p className="ct-address">{content.address}</p>
            </div>
          </div>

          {/* FORM AREA */}
          <div className="ct-form-grid">
            <div className="ct-form-intro">
              <span className="ct-eyebrow">{content.formLabel}</span>
              <h2>{content.formTitle}</h2>
              <p>{content.formDescription}</p>

              <div className="ct-benefits">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Clear and professional communication</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>General product information</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Easy contact process</span>
                </div>
              </div>

              <div className="ct-mini-card">
                <span className="ct-mini-icon">
                  <i className="bi bi-headset"></i>
                </span>

                <div>
                  <strong>Need direct assistance?</strong>
                  <span>Call us at {content.phone}</span>
                </div>
              </div>
            </div>

            <div className="ct-form-box">
              <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
                <div className="ct-row">
                  <div className="ct-field">
                    <label htmlFor="ct-name">Your Name</label>
                    <input
                      id="ct-name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-email">Your Email</label>
                    <input
                      id="ct-email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-subject">Subject</label>
                  <input
                    id="ct-subject"
                    type="text"
                    placeholder="What would you like to ask?"
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-message">Your Message</label>
                  <textarea
                    id="ct-message"
                    placeholder="Write your message here..."
                    rows="7"
                  ></textarea>
                </div>

                <button type="submit" className="ct-submit">
                  <span>Send Message</span>
                  <i className="bi bi-send-fill"></i>
                </button>
              </form>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="ct-social">
            <span className="ct-eyebrow">{content.socialLabel}</span>
            <h3>{content.socialTitle}</h3>
            <p>{content.socialDescription}</p>

            <div className="ct-social-links">
              <a
                href={content.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href={content.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href={content.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>

              <a
                href={content.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* BACK HOME */}
          <div className="ct-home">
            <Link to="/" className="ct-home-btn">
              <i className="bi bi-arrow-left"></i>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;