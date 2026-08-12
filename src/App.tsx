import { Navigate, Route, Routes } from "react-router-dom";
import NewLanding from "./pages/landing/NewLanding";
import WaveAudit from "./pages/wave-audit/WaveAudit";
import Checkout from "./pages/checkout/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NewLanding />} />
      <Route path="/wave-audit" element={<WaveAudit />} />
      <Route path="/wave-check" element={<WaveAudit />} />
      <Route path="/pricing" element={<Checkout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
