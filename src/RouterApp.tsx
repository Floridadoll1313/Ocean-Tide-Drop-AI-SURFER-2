import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import MemberGate from "./pages/members/MemberGate";
import MembersDashboard from "./pages/members/MembersDashboard";
import MemberProduct from "./pages/members/MemberProduct";
import WaveAudit from "./pages/wave-audit/WaveAudit";
import LaunchDesk from "./launch-desk/LaunchDesk";
import SiteLogoHeader from "./components/SiteLogoHeader";

export default function RouterApp() {
  return (
    <>
      <SiteLogoHeader />
      <div data-site-route-content="true">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pricing" element={<App />} />
          <Route path="/wave-audit" element={<WaveAudit />} />
          <Route path="/wave-check" element={<WaveAudit />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/launch-desk"
            element={
              <ProtectedRoute>
                <LaunchDesk />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MembersDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members/products/:slug"
            element={
              <ProtectedRoute>
                <MemberGate>
                  <MemberProduct />
                </MemberGate>
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard" element={<Navigate to="/members" replace />} />
          <Route path="/ai-dashboard" element={<Navigate to="/members" replace />} />
          <Route path="*" element={<App />} />
        </Routes>
      </div>
    </>
  );
}
