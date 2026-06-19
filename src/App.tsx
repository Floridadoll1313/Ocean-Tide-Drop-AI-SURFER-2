import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";

// Layout
import Layout from "./layouts/Layout";

// Pages
import { testSupabase } from "./lib/supabaseTest";

testSupabase();
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import Pricing from "./pages/pricing/Pricing";
import PricingDetail from "./pages/pricing/PricingDetail";
import Members from "./pages/members/Members";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Shop from "./pages/shop/Shop";
import FreeGuideLanding from "./pages/FreeGuideLanding";

import { testSupabase } from "./utils/testSupabase";
import CalendlyBadge from "./components/CalendlyBadge";
function App() {
  useEffect(() => {
    testSupabase();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* 🌊 ALL ROUTES FLOW THROUGH LAYOUT */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing/:slug" element={<PricingDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/members" element={<Members />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/free-guide" element={<FreeGuideLanding />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;