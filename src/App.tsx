import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Pricing from './pages/pricing/Pricing';
import PricingDetail from './pages/pricing/PricingDetail';
import Members from './pages/members/Members';
import Lore from './pages/lore/Lore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/:slug" element={<PricingDetail />} />
        <Route path="/members" element={<Members />} />
        <Route path="/lore" element={<Lore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
