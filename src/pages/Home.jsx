import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { defaultSiteContent } from "../lib/siteContent";
import Hero from "../components/Hero";
import Products from "../components/Products";
import "./Home.css";

function Home() {
  const [content, setContent] = useState(defaultSiteContent.home);

  useEffect(() => {
    const fetchHomeContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("content_key", "home")
        .eq("is_published", true)
        .maybeSingle();

      if (!error && data?.content) {
        setContent((previous) => ({
          ...previous,
          ...data.content,
        }));
      }
    };

    fetchHomeContent();
  }, []);

  const featureCards = Array.isArray(content.featureCards)
    ? content.featureCards
    : defaultSiteContent.home.featureCards;

  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* PRODUCTS / COLLECTIONS */}
      <Products />

      {/* WHY DELTA GUN */}
      <section className="hm-why">
        <div className="hm-container">
          <div className="hm-why-head">
            <span className="hm-eyebrow">{content.featuresLabel}</span>
            <h2>{content.featuresTitle}</h2>
            <p>{content.featuresDescription}</p>
          </div>

          <div className="hm-why-grid">
            {featureCards.map((card, index) => (
              <div className="hm-why-card" key={card.id || index}>
                <div className="hm-why-top">
                  <span className="hm-why-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <i className={`bi bi-${card.icon || "star"}`}></i>
                </div>

                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND INTRODUCTION */}
      <section className="hm-brand">
        <div className="hm-container hm-brand-grid">
          <div className="hm-brand-content">
            <span className="hm-eyebrow">DELTA GUN</span>

            <h2>{content.brandTitle}</h2>
            <p>{content.brandDescription}</p>

            <div className="hm-brand-actions">
              <Link to="/products" className="hm-btn hm-btn-primary">
                Explore Collection
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/about" className="hm-btn hm-btn-outline">
                About Delta Gun
              </Link>
            </div>
          </div>

          <div className="hm-brand-list">
            <div className="hm-brand-item">
              <i className="bi bi-check-circle-fill"></i>
              <div>
                <strong>Quality Focused</strong>
                <span>Carefully presented collections</span>
              </div>
            </div>

            <div className="hm-brand-item">
              <i className="bi bi-check-circle-fill"></i>
              <div>
                <strong>Professional Presentation</strong>
                <span>Clean and modern experience</span>
              </div>
            </div>

            <div className="hm-brand-item">
              <i className="bi bi-check-circle-fill"></i>
              <div>
                <strong>Customer Support</strong>
                <span>We're here to help with inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="hm-cta-section">
        <div className="hm-container">
          <div className="hm-cta">
            <span className="hm-cta-label">{content.ctaLabel}</span>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaDescription}</p>

            <div className="hm-cta-buttons">
              <Link to="/products" className="hm-cta-primary">
                Shop All
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/contact" className="hm-cta-secondary">
                <i className="bi bi-chat-dots"></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;