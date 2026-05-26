import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import Pricing from './pages/pricing/Pricing';
import PricingDetail from './pages/pricing/PricingDetail';
import Members from './pages/members/Members';
import Lore from './pages/lore/Lore';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import Mcp from './pages/mcp/Mcp';
import Profile from './pages/profile/Profile';
import ToolInterface from './pages/members/ToolInterface';
import Monetization from './pages/members/Monetization';
import Workspace from './pages/members/Workspace';
import Gallery from './pages/gallery/Gallery';
import Founders from './pages/founders/Founders';
import Forecast from './pages/forecast/Forecast';
import Diary from './pages/diary/Diary';
import Shop from './pages/shop/Shop';
import Memorial from './pages/memorial/Memorial';
import Reviews from './pages/reviews/Reviews';
import Support from './pages/support/Support';
import Tribute from './pages/tribute/Tribute';
import CreatePrompting from './pages/prompting/CreatePrompting';
import AISurfer from './pages/surfer/AISurfer';
import NodeCommander from './pages/commander/NodeCommander';
import OceanTideDrop from './pages/ocean/OceanTideDrop';
import OceanServices from './pages/ocean/OceanServices';
import OceanSurfReports from './pages/ocean/OceanSurfReports';
import OceanCaseStudies from './pages/ocean/OceanCaseStudies';
import OceanROICalculator from './pages/ocean/OceanROICalculator';
import OceanContact from './pages/ocean/OceanContact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tipjar" element={<Navigate to="/tip-jar" replace />} />
          <Route path="/tip-jar" element={<Tribute />} />
          <Route path="/tribute" element={<Tribute />} />
          <Route path="/create" element={<CreatePrompting />} />
          <Route path="/surfer" element={<AISurfer />} />
          <Route path="/ai-surfer" element={<AISurfer />} />
          <Route path="/commander" element={<NodeCommander />} />
          <Route path="/ocean" element={<OceanTideDrop />} />
          <Route path="/ai-surfer-ocean-tide-drop" element={<Navigate to="/ocean" replace />} />
          <Route path="/ocean-services" element={<OceanServices />} />
          <Route path="/ocean-reports" element={<OceanSurfReports />} />
          <Route path="/ocean-cases" element={<OceanCaseStudies />} />
          <Route path="/ocean-roi" element={<OceanROICalculator />} />
          <Route path="/ocean-contact" element={<OceanContact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing/:slug" element={<PricingDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/dashboard" element={<Navigate to="/members" replace />} />
          <Route path="/ai-dashboard" element={<Navigate to="/members" replace />} />
          <Route path="/oas-6" element={<Navigate to="/members" replace />} />
          <Route path="/members/monetization" element={<Monetization />} />
          <Route path="/members/sync" element={<Workspace />} />
          <Route path="/members/tool/:toolId" element={<ToolInterface />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/mcp" element={<Mcp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
