import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const links = [
    { to: "/", label: "Home", icon: "bi-house-door" },
    { to: "/products", label: "Shop All", icon: "bi-grid" },
    { to: "/about", label: "About", icon: "bi-info-circle" },
    { to: "/contact", label: "Contact", icon: "bi-envelope" },
  ];

  return (
    <>
      {/* Top info bar */}
      <div className="dg-topbar">
        <div className="dg-topbar-inner">
          <span className="dg-topbar-live">
            <span className="dg-topbar-dot"></span>
            SHOWROOM LIVE • Karachi / PK
          </span>

          <span className="dg-topbar-center">
            SYS.2026 // LICENSED FIREARMS &amp; TACTICAL ARMORY
          </span>

          <a href="tel:+923131555111" className="dg-topbar-phone">
            +92 313 1555 111
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="dg-header">
        <div className="dg-header-inner">
          {/* Brand */}
          <Link to="/" className="dg-brand" onClick={closeMenu}>
            <span className="dg-brand-logo">
              <img src="/logo.png" alt="Delta Gun Logo" />
            </span>

            <span className="dg-brand-text">
              <span className="dg-brand-name">DELTA GUN</span>
              <span className="dg-brand-tagline">
                PRECISION • QUALITY • PERFORMANCE
              </span>
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className={`dg-nav ${menuOpen ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={isActive(item.to) ? "active" : ""}
                onClick={closeMenu}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="dg-header-action">
            <Link
              to="/contact"
              className={`dg-header-cta ${
                isActive("/contact") ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              <i className="bi bi-chat-dots"></i>
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="dg-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;