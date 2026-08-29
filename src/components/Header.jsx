import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Brand */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="Delta Gun Logo"
            className="brand-logo"
          />

          <span className="brand-name">
            DELTA GUN
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >

          {/* Home */}
          <Link
            to="/"
            className={isActive("/") ? "active" : ""}
            onClick={closeMenu}
          >
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </Link>

          {/* Shop All */}
          <Link
            to="/products"
            className={isActive("/products") ? "active" : ""}
            onClick={closeMenu}
          >
            <i className="bi bi-grid"></i>
            <span>Shop All</span>
          </Link>

          {/* About */}
          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={closeMenu}
          >
            <i className="bi bi-info-circle"></i>
            <span>About</span>
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={closeMenu}
          >
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </Link>

        </nav>

        {/* Contact Button */}
        <div className="header-action">
          <Link
            to="/contact"
            className={`header-contact ${
              isActive("/contact") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <i className="bi bi-chat-dots"></i>
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          <i
            className={
              menuOpen
                ? "bi bi-x-lg"
                : "bi bi-list"
            }
          ></i>
        </button>

      </div>
    </header>
  );
}

export default Header;