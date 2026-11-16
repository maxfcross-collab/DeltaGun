import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AdminLayout from "../components/AdminLayout";
import "./AdminDashboard.css";

const cards = [
  {
    to: "/admin/products",
    num: "01",
    icon: "bi-box-seam",
    title: "Products",
    text: "Manage website products",
  },
  {
    to: "/admin/media",
    num: "02",
    icon: "bi-images",
    title: "Media Library",
    text: "Manage images and videos",
  },
  {
    to: "/admin/content",
    num: "03",
    icon: "bi-file-earmark-text",
    title: "Page Content",
    text: "Edit Home, About and Contact",
    badge: "Available",
  },
];

function AdminDashboard() {
  // null = still loading, "-" = failed
  const [stats, setStats] = useState({
    total: null,
    active: null,
    pages: null,
  });

  useEffect(() => {
    let active = true;

    const countOf = async (query) => {
      const { count, error } = await query;
      return error ? "-" : count ?? 0;
    };

    const loadStats = async () => {
      const [total, activeProducts, pages] = await Promise.all([
        countOf(
          supabase.from("products").select("*", { count: "exact", head: true })
        ),
        countOf(
          supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("is_active", true)
        ),
        countOf(
          supabase
            .from("site_content")
            .select("*", { count: "exact", head: true })
            .eq("is_published", true)
        ),
      ]);

      if (active) {
        setStats({ total, active: activeProducts, pages });
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  const show = (value) => (value === null ? "…" : value);

  return (
    <AdminLayout
      eyebrow="SYS.ADMIN // DASHBOARD"
      title="Dashboard"
      subtitle="Welcome to your Delta Gun website management panel."
    >
      {/* STATS */}
      <div className="add-stats">
        <div className="add-stat">
          <strong>{show(stats.total)}</strong>
          <span>TOTAL PRODUCTS</span>
        </div>

        <div className="add-stat">
          <strong>{show(stats.active)}</strong>
          <span>ACTIVE ON WEBSITE</span>
        </div>

        <div className="add-stat add-stat-blue">
          <strong>{show(stats.pages)}</strong>
          <span>PUBLISHED PAGES</span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="add-cards">
        {cards.map((card) => (
          <Link to={card.to} className="add-card" key={card.to}>
            <div className="add-card-top">
              <span className="add-card-num">{card.num}</span>
              <i className={`bi ${card.icon}`}></i>
            </div>

            <h3>{card.title}</h3>
            <p>{card.text}</p>

            <div className="add-card-foot">
              {card.badge ? (
                <span className="add-badge">{card.badge}</span>
              ) : (
                <span></span>
              )}

              <span className="add-open">
                OPEN
                <i className="bi bi-arrow-right"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* BANNER */}
      <div className="add-banner">
        <div>
          <span className="add-banner-label">WEBSITE MANAGEMENT</span>
          <h2>Everything In One Place</h2>
          <p>
            Manage your products, uploaded media and website page content from
            one place.
          </p>
        </div>

        <Link to="/" target="_blank" className="add-banner-btn">
          View Website
          <i className="bi bi-arrow-up-right"></i>
        </Link>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;