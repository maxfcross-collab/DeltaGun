import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Brand */}
        <a href="#home" className="brand" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="Delta Gun Logo"
            className="brand-logo"
          />

          <span className="brand-name">
            DELTA GUN
          </span>
        </a>

        {/* Navigation */}
        <nav
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </a>

          <a href="#products" onClick={closeMenu}>
            <i className="bi bi-grid"></i>
            <span>Shop All</span>
          </a>

          <a href="#about" onClick={closeMenu}>
            <i className="bi bi-info-circle"></i>
            <span>About</span>
          </a>

          <a href="#contact" onClick={closeMenu}>
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </a>
        </nav>

        {/* Contact Button */}
        <div className="header-action">
          <a href="#contact" className="header-contact">
            <i className="bi bi-chat-dots"></i>
            <span>Contact Us</span>
          </a>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <i
            className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}
          ></i>
        </button>

      </div>
    </header>
  );
}

export default Header;