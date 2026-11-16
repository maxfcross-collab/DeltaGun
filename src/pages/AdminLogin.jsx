import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!admin) {
        await supabase.auth.signOut();
        throw new Error("You are not authorized to access the admin panel.");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adl-page">
      {/* LEFT: BRAND PANEL */}
      <aside className="adl-panel">
        <Link to="/" className="adl-panel-brand">
          <span className="adl-panel-logo">
            <img src="/logo.png" alt="Delta Gun" />
          </span>
          <strong>DELTA GUN</strong>
        </Link>

        <div className="adl-panel-visual">
          <div className="adl-ring adl-ring-1"></div>
          <div className="adl-ring adl-ring-2"></div>
          <div className="adl-ring adl-ring-3"></div>

          <div className="adl-panel-center">
            <i className="bi bi-shield-lock"></i>
            <strong>ADMIN</strong>
            <small>SECURE ACCESS</small>
          </div>
        </div>

        <div className="adl-panel-copy">
          <span>SYS.ADMIN // PRECISION SHOWROOM</span>
          <h2>Manage Your Website With Confidence.</h2>
          <p>
            Products, media and page content, all controlled from one secure
            panel.
          </p>
        </div>
      </aside>

      {/* RIGHT: FORM */}
      <main className="adl-form-side">
        <div className="adl-form-box">
          <span className="adl-eyebrow">ADMIN LOGIN</span>

          <h1>Welcome Back</h1>
          <p className="adl-sub">
            Sign in with your authorized admin account to continue.
          </p>

          <form onSubmit={handleLogin} className="adl-form">
            <div className="adl-field">
              <label htmlFor="adl-email">Email Address</label>

              <div className="adl-input">
                <i className="bi bi-envelope"></i>
                <input
                  id="adl-email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="adl-field">
              <label htmlFor="adl-password">Password</label>

              <div className="adl-input">
                <i className="bi bi-lock"></i>
                <input
                  id="adl-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="adl-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="adl-error">
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="adl-submit" disabled={loading}>
              <span>{loading ? "Please wait..." : "Login"}</span>
              {!loading && <i className="bi bi-arrow-right"></i>}
            </button>
          </form>

          <Link to="/" className="adl-back">
            <i className="bi bi-arrow-left"></i>
            Back to Website
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AdminLogin;