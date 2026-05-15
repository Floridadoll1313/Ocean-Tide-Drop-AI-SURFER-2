import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Pricing from './pages/pricing/Pricing';
import PricingDetail from './pages/pricing/PricingDetail';
import Members from './pages/members/Members';
import Lore from './pages/lore/Lore';
import Mcp from './pages/mcp/Mcp';
import Profile from './pages/profile/Profile';
import ToolInterface from './pages/members/ToolInterface';
import Gallery from './pages/gallery/Gallery';
import Forecast from './pages/forecast/Forecast';
import Diary from './pages/diary/Diary';
import Shop from './pages/shop/Shop';
import Memorial from './pages/memorial/Memorial';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing/:slug" element={<PricingDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/tool/:toolId" element={<ToolInterface />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/mcp" element={<Mcp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
