import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import MembersLayout from "./components/members/MembersLayout";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import MembersDashboard from "./pages/members/MembersDashboard";
import MemberProduct from "./pages/members/MemberProduct";
import HomeLanding from "./pages/home/HomeLanding";
import WaveAudit from "./pages/wave-audit/WaveAudit";
import LaunchDesk from "./launch-desk/LaunchDesk";
import SiteLogoHeader from "./components/SiteLogoHeader";

export default function RouterApp() {
  return (
    <>
      <div
        role="status"
        aria-label="Launch week discount"
        style={{
          position: "relative",
          zIndex: 60,
          boxSizing: "border-box",
          width: "100%",
          padding: "12px 16px",
          background: "linear-gradient(90deg,#00f2fe,#4facfe)",
          color: "#020305",
          textAlign: "center",
          fontWeight: 800,
          lineHeight: 1.4,
        }}
      >
        🌊 LAUNCH WEEK SPECIAL: Get 20% OFF with code <strong>OCEANTIDE20</strong> at checkout! 🏄‍♀️
      </div>
      <SiteLogoHeader />
      <div data-site-route-content="true">
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/pricing" element={<App />} />
          <Route path="/wave-audit" element={<WaveAudit />} />
          <Route path="/wave-check" element={<WaveAudit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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
                <MembersLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MembersDashboard />} />
            <Route path="products/:slug" element={<MemberProduct />} />
          </Route>

          <Route path="/dashboard" element={<Navigate to="/members" replace />} />
          <Route path="/ai-dashboard" element={<Navigate to="/members" replace />} />
          <Route path="*" element={<HomeLanding />} />
        </Routes>
      </div>
    </>
  );
}
