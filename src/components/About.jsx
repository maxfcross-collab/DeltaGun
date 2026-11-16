import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { defaultSiteContent } from "../lib/siteContent";
import "./About.css";

const defaultAboutCards = {
  valuesCards: [
    {
      title: "Quality Focused",
      description:
        "Carefully presented selections with attention to quality, design and detail.",
      icon: "bi-patch-check",
    },
    {
      title: "Precision Driven",
      description:
        "Clear and professional information designed to help customers explore available options.",
      icon: "bi-bullseye",
    },
    {
      title: "Easy Contact",
      description:
        "A simple and convenient way to connect with our team for more information.",
      icon: "bi-chat-dots",
    },
  ],

  whyParagraph2:
    "From featured collections to premium selections, our presentation is built to make browsing simple, clear and professional.",

  checklist: [
    "Clear information presentation",
    "Professional collection categories",
    "Simple customer communication",
    "Quality-focused presentation",
  ],

  whyCardTitle: "Quality. Precision. Performance.",
  whyCardDescription:
    "Professional presentation of selected collections for enthusiasts.",

  whyMeta: [
    { number: "01", label: "Quality" },
    { number: "02", label: "Precision" },
    { number: "03", label: "Service" },
  ],

  highlightsCards: [
    {
      number: "01",
      title: "Curated Collections",
      description:
        "Explore carefully presented collections organized for a simple browsing experience.",
      icon: "bi-grid-3x3-gap",
    },
    {
      number: "02",
      title: "Clear Information",
      description:
        "Find straightforward information about our collections and available options.",
      icon: "bi-info-circle",
    },
    {
      number: "03",
      title: "Customer Support",
      description:
        "Get in touch with our team whenever you need additional information or assistance.",
      icon: "bi-headset",
    },
    {
      number: "04",
      title: "Professional Presentation",
      description:
        "A clean and modern presentation built around quality and attention to detail.",
      icon: "bi-stars",
    },
  ],
};

/* First sentence = dark, rest = royal blue */
const splitTitle = (title = "") => {
  const sentences =
    title.trim().match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()) || [];

  if (sentences.length > 1) {
    return { dark: sentences[0], blue: sentences.slice(1).join(" ") };
  }

  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return { dark: title, blue: "" };

  const mid = Math.ceil(words.length / 2);
  return {
    dark: words.slice(0, mid).join(" "),
    blue: words.slice(mid).join(" "),
  };
};

/* Icon names from admin may come with or without "bi-" prefix */
const iconClass = (icon, fallback = "bi-star") => {
  const name = icon || fallback;
  return `bi ${name.startsWith("bi-") ? name : `bi-${name}`}`;
};

function About() {
  const [content, setContent] = useState({
    ...defaultSiteContent.about,
    ...defaultAboutCards,
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("content_key", "about")
        .eq("is_published", true)
        .maybeSingle();

      if (!error && data?.content) {
        setContent((previous) => ({
          ...previous,
          ...data.content,
        }));
      }
    };

    fetchAboutContent();
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const items = document.querySelectorAll(".ab-reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  const { dark, blue } = splitTitle(content.heroTitle);

  const values = content.valuesCards || defaultAboutCards.valuesCards;
  const checklist = content.checklist || defaultAboutCards.checklist;
  const meta = content.whyMeta || defaultAboutCards.whyMeta;
  const highlights =
    content.highlightsCards || defaultAboutCards.highlightsCards;

  const ribbon = [
    "QUALITY",
    "PRECISION",
    "PERFORMANCE",
    "PROFESSIONAL",
    "DELTA GUN",
  ];

  return (
    <div className="ab-page">
      {/* ================= HERO ================= */}
      <section className="ab-hero">
        <div className="ab-container ab-hero-grid">
          <div className="ab-hero-copy">
            <span className="ab-pill">
              <span className="ab-pill-dot"></span>
              {content.heroLabel}
            </span>

            <h1>
              <span className="ab-title-dark">{dark}</span>
              {blue && <span className="ab-title-blue">{blue}</span>}
            </h1>

            <p className="ab-lead">{content.heroDescription}</p>
            <p className="ab-lead ab-lead-2">{content.heroDescription2}</p>

            <div className="ab-actions">
              <Link to="/products" className="ab-btn ab-btn-primary">
                Explore Collection
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/contact" className="ab-btn ab-btn-outline">
                <i className="bi bi-chat-dots"></i>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Visual panel */}
          <div className="ab-visual">
            <div className="ab-visual-frame">
              <div className="ab-visual-top">
                <span>
                  <i className="ab-dot"></i> ABOUT DELTA GUN
                </span>
                <span>SYS.01</span>
              </div>

              <div className="ab-visual-canvas">
                <div className="ab-ring ab-ring-1"></div>
                <div className="ab-ring ab-ring-2"></div>
                <div className="ab-ring ab-ring-3"></div>

                <div className="ab-visual-center">
                  <i className="bi bi-bullseye"></i>
                  <strong>DELTA</strong>
                  <small>PRECISION SHOWROOM</small>
                </div>

                <div className="ab-chip ab-chip-top">
                  <i className="bi bi-patch-check-fill"></i>
                  <span>
                    QUALITY
                    <br />
                    FOCUSED
                  </span>
                </div>

                <div className="ab-chip ab-chip-bottom">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>
                    Karachi
                    <br />
                    SHOWROOM
                  </span>
                </div>
              </div>

              <div className="ab-visual-bottom">
                <span>QUALITY · PRECISION · PERFORMANCE</span>
                <i className="bi bi-arrow-down-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RIBBON ================= */}
      <div className="ab-ribbon" aria-hidden="true">
        <div className="ab-ribbon-track">
          {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map((word, i) => (
            <span key={i}>
              {word}
              <i className="bi bi-plus-lg"></i>
            </span>
          ))}
        </div>
      </div>

      {/* ================= VALUES ================= */}
      <section className="ab-section">
        <div className="ab-container">
          <div className="ab-head ab-reveal">
            <span className="ab-eyebrow">{content.valuesLabel}</span>
            <h2>{content.valuesTitle}</h2>
            <p>{content.valuesDescription}</p>
          </div>

          <div className="ab-values">
            {values.map((item, index) => (
              <div
                className={`ab-value ab-reveal ${
                  index === 0 ? "is-featured" : ""
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
                key={index}
              >
                <span className="ab-value-num">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="ab-value-icon">
                  <i className={iconClass(item.icon)}></i>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY (DARK) ================= */}
      <section className="ab-why-section">
        <div className="ab-container ab-why">
          <div className="ab-why-text ab-reveal">
            <span className="ab-eyebrow">{content.whyLabel}</span>
            <h2>{content.whyTitle}</h2>
            <p>{content.whyDescription}</p>
            <p>{content.whyParagraph2}</p>

            <div className="ab-checks">
              {checklist.map((item, index) => (
                <div key={index}>
                  <i className="bi bi-check-lg"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-why-card ab-reveal">
            <div className="ab-why-icon">
              <i className="bi bi-award"></i>
            </div>

            <span className="ab-why-tag">DELTA GUN</span>

            <h3>{content.whyCardTitle}</h3>
            <p>{content.whyCardDescription}</p>

            <div className="ab-divider"></div>

            <div className="ab-meta">
              {meta.map((item, index) => (
                <div key={index}>
                  <strong>{item.number}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS / STEPS ================= */}
      <section className="ab-section">
        <div className="ab-container">
          <div className="ab-head ab-reveal">
            <span className="ab-eyebrow">{content.highlightsLabel}</span>
            <h2>{content.highlightsTitle}</h2>
            <p>{content.highlightsDescription}</p>
          </div>

          <div className="ab-steps">
            {highlights.map((item, index) => (
              <div
                className="ab-step ab-reveal"
                style={{ transitionDelay: `${index * 90}ms` }}
                key={index}
              >
                <div className="ab-step-node">
                  <span>
                    {item.number || String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="ab-step-card">
                  <i className={iconClass(item.icon)}></i>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ab-cta-section">
        <div className="ab-container">
          <div className="ab-cta ab-reveal">
            <span className="ab-cta-label">{content.ctaLabel}</span>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaDescription}</p>

            <div className="ab-cta-buttons">
              <Link to="/products" className="ab-cta-primary">
                Shop All
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/contact" className="ab-cta-secondary">
                <i className="bi bi-chat-text"></i>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;