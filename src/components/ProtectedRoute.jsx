import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./AdminLayout.css";

function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    const verifyAdmin = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (active) setAuthorized(false);
          return;
        }

        const { data: admin, error: adminError } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (adminError || !admin) {
          await supabase.auth.signOut();
          if (active) setAuthorized(false);
          return;
        }

        if (active) setAuthorized(true);
      } catch {
        if (active) setAuthorized(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    verifyAdmin();

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="adm-verify">
        <span className="adm-spinner"></span>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;