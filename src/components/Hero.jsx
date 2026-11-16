import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { defaultSiteContent } from "../lib/siteContent";
import "./Hero.css";

/* Splits the admin-managed title into two parts:
   first part = dark, second part = royal blue */
const splitTitle = (title = "") => {
  const clean = title.trim();

  const sentences = clean.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()) || [];

  if (sentences.length > 1) {
    return {
      dark: sentences[0],
      blue: sentences.slice(1).join(" "),
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);

  if (words.length < 2) return { dark: clean, blue: "" };

  const mid = Math.ceil(words.length / 2);

  return {
    dark: words.slice(0, mid).join(" "),
    blue: words.slice(mid).join(" "),
  };
};

/* Default stats - edit these to match your real business info.
   Optional: admin can later provide content.heroStats = [{ value, label }] */
const defaultStats = [
  { value: "100%", label: "LICENSED & VERIFIED" },
  { value: "24+", label: "CURATED MODELS" },
  { value: "< 2 Hr", label: "CONCIERGE RESPONSE" },
];

function Hero() {
  const [content, setContent] = useState(defaultSiteContent.home);

  useEffect(() => {
    const fetchHeroContent = async () => {
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

    fetchHeroContent();
  }, []);

  const { dark, blue } = splitTitle(content.heroTitle);

  const stats =
    Array.isArray(content.heroStats) && content.heroStats.length
      ? content.heroStats
      : defaultStats;

  return (
    <section className="dg-hero" id="home">
      <div className="dg-hero-inner">
        {/* LEFT CONTENT */}
        <div className="dg-hero-copy">
          <div className="dg-hero-eyebrow">
            <span className="dg-hero-eyebrow-dot"></span>
            <span>{content.heroLabel}</span>
          </div>

          <h1>
            <span className="dg-title-dark">{dark}</span>
            {blue && <span className="dg-title-blue">{blue}</span>}
          </h1>

          <p className="dg-hero-description">{content.heroDescription}</p>

          <div className="dg-hero-buttons">
            <a href="#products" className="dg-hero-btn dg-hero-btn-primary">
              <span>{content.heroPrimaryButton}</span>
              <i className="bi bi-arrow-right"></i>
            </a>

            <Link to="/contact" className="dg-hero-btn dg-hero-btn-secondary">
              <i className="bi bi-chat-square-text"></i>
              <span>{content.heroSecondaryButton}</span>
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL PANEL */}
        <div className="dg-hero-visual">
          <div className="dg-visual-frame">
            <div className="dg-visual-topbar">
              <span className="dg-visual-brand">
                <span className="dg-visual-dot"></span>
                DELTA GUN
              </span>
              <span className="dg-visual-index">01 / 03</span>
            </div>

            <div className="dg-visual-main">
              <div className="dg-ring dg-ring-one"></div>
              <div className="dg-ring dg-ring-two"></div>

              <div className="dg-visual-center">
                <span className="dg-center-small">THE</span>
                <span className="dg-center-title">DELTA</span>
                <span className="dg-center-subtitle">SIGNATURE</span>
                <div className="dg-center-line"></div>
                <span className="dg-center-caption">
                  QUALITY · DESIGN · DETAIL
                </span>
              </div>

              <div className="dg-floating dg-floating-top">
                <i className="bi bi-stars"></i>
                <span>
                  PREMIUM
                  <br />
                  PRESENTATION
                </span>
              </div>

              <div className="dg-floating dg-floating-bottom">
                <strong>01</strong>
                <span>
                  CURATED
                  <br />
                  COLLECTIONS
                </span>
              </div>
            </div>

            <div className="dg-visual-footer">
              <span>EXPLORE OUR COLLECTIONS</span>
              <i className="bi bi-arrow-down-right"></i>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="dg-hero-stats">
        {stats.map((stat) => (
          <div className="dg-stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;