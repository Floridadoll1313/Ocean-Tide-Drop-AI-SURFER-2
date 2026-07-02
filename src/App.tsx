import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { bootAI } from "./services/ai";

import Home from "./pages/home/Home";
import Pricing from "./pages/pricing/Pricing";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/login";
import Members from "./pages/members/Members";
import Billing from "./pages/billing/Billing";

export default function App() {
  useEffect(() => {
    bootAI();
  }, []);

  return (
    <Routes>
      {/* 🌊 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />

      {/* 🔐 SaaS Core */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
}
