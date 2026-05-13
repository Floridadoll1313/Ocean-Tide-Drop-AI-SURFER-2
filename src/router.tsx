import React from "react";
import { createBrowserRouter } from "react-router-dom";

/* PUBLIC PAGES */
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Members from "./pages/members/Members";
import JoinCollective from "./pages/membership/MembershipIndex";
import Lore from "./pages/lore/Lore";
import Marketplace from "./pages/marketplace/Marketplace";
import Dashboard from "./pages/dashboard/Dashboard";
import AIStudio from "./pages/studio/AIStudio";
import Automations from "./pages/automations/Automations";
import Blueprints from "./pages/blueprints/Blueprints";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Contact from "./pages/contact/Contact";
import SubscriptionGate from "./components/SubscriptionGate";

/* PRICING SYSTEM */
import PricingOverview from "./pages/pricing/Pricing";
import PricingDetail from "./pages/pricing/PricingDetail";

/* SYSTEM */
import NotFound from "./pages/notfound/NotFound";
import Layout from "./layouts/Layout";
import MembersLayout from "./layouts/MembersLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "automations", element: <Automations /> },
      { path: "blueprints", element: <Blueprints /> },
      { path: "join", element: <JoinCollective /> },
      { path: "admin", element: <AdminDashboard /> },

      /* PRICING ROUTES */
      { path: "pricing", element: <PricingOverview /> },
      { path: "pricing/:slug", element: <PricingDetail /> },

      { path: "dashboard", element: <Dashboard /> },
      { path: "studio", element: <SubscriptionGate><AIStudio /></SubscriptionGate> },
      { path: "lore", element: <Lore /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/members",
    element: <SubscriptionGate><MembersLayout /></SubscriptionGate>,
    children: [
      { index: true, element: <Members /> },
      { path: "dashboard", element: <div className="p-8">Member Dashboard Content</div> },
      { path: "realm", element: <div className="p-8">Realm Metrics Content</div> },
      { path: "lore", element: <div className="p-8">Lore Engine Content</div> },
      { path: "signals", element: <div className="p-8">Member Signals Content</div> },
      { path: "cinematic", element: <div className="p-8">Cinematic Systems Content</div> },
    ],
  },
]);
