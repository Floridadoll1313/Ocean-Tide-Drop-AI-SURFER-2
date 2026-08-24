import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import MembersLayout from "./components/members/MembersLayout";
import Login from "./pages/auth/Login";
import AgentWorkspace from "./pages/members/AgentWorkspace";
import CrewDeck from "./pages/members/CrewDeck";
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
                <MembersLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MembersDashboard />} />
            <Route path="products/:slug" element={<MemberProduct />} />
            <Route path="crew" element={<CrewDeck />} />
            <Route path="crew/:agentSlug" element={<AgentWorkspace />} />
          </Route>

          <Route path="/dashboard" element={<Navigate to="/members" replace />} />
          <Route path="/ai-dashboard" element={<Navigate to="/members" replace />} />
          <Route path="*" element={<App />} />
        </Routes>
      </div>
    </>
  );
}
