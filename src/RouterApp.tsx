import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import MemberGate from "./pages/members/MemberGate";
import MembersDashboard from "./pages/members/MembersDashboard";
import WaveAudit from "./pages/wave-audit/WaveAudit";

export default function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pricing" element={<App />} />
      <Route path="/wave-audit" element={<WaveAudit />} />
      <Route path="/wave-check" element={<WaveAudit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/members" element={<MemberGate><MembersDashboard /></MemberGate>} />
      <Route path="/dashboard" element={<Navigate to="/members" replace />} />
      <Route path="/ai-dashboard" element={<Navigate to="/members" replace />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}
