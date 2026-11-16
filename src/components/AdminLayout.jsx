import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./AdminLayout.css";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "bi-grid-1x2" },
  { to: "/admin/products", label: "Products", icon: "bi-box-seam" },
  { to: "/admin/media", label: "Media Library", icon: "bi-images" },
  { to: "/admin/content", label: "Page Content", icon: "bi-file-earmark-text" },
];

function AdminLayout({ eyebrow, title, subtitle, actions, children }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active && data?.user?.email) setEmail(data.user.email);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      setLoggingOut(false);
      return;
    }

    navigate("/admin/login", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="adm-shell">
      {/* SIDEBAR */}
      <aside className={`adm-sidebar ${menuOpen ? "open" : ""}`}>
        <Link to="/admin/dashboard" className="adm-brand" onClick={closeMenu}>
          <span className="adm-brand-logo">
            <img src="/logo.png" alt="Delta Gun" />
          </span>

          <span className="adm-brand-text">
            <strong>DELTA GUN</strong>
            <small>ADMIN PANEL</small>
          </span>
        </Link>

        <span className="adm-nav-label">SYS.ADMIN // MENU</span>

        <nav className="adm-nav" aria-label="Admin navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="adm-side-bottom">
          {email && (
            <div className="adm-user">
              <span className="adm-user-avatar">
                {email.charAt(0).toUpperCase()}
              </span>

              <span className="adm-user-text">
                <small>SIGNED IN AS</small>
                <strong title={email}>{email}</strong>
              </span>
            </div>
          )}

          <Link to="/" target="_blank" className="adm-side-link">
            <i className="bi bi-box-arrow-up-right"></i>
            <span>View Website</span>
          </Link>

          <button
            type="button"
            className="adm-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>{loggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {menuOpen && <div className="adm-overlay" onClick={closeMenu}></div>}

      {/* MAIN */}
      <div className="adm-main">
        <header className="adm-topbar">
          <button
            type="button"
            className="adm-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>

          <span className="adm-live">
            <span className="adm-live-dot"></span>
            ADMIN CONSOLE • LAHORE / PK
          </span>

          <Link to="/" target="_blank" className="adm-top-link">
            View Website
            <i className="bi bi-arrow-up-right"></i>
          </Link>
        </header>

        <main className="adm-content">
          <div className="adm-page-head">
            <div>
              {eyebrow && <span className="adm-eyebrow">{eyebrow}</span>}
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>

            {actions && <div className="adm-page-actions">{actions}</div>}
          </div>

          {error && <div className="adm-alert">{error}</div>}

          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;