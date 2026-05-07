import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import Services from "./pages/Services";
import Members from "./pages/Members";
import JoinCollective from "./pages/JoinCollective";
import Lore from "./pages/Lore";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import AIStudio from "./pages/AIStudio";
import Automations from "./pages/Automations";
import Blueprints from "./pages/Blueprints";
import AdminDashboard from "./pages/AdminDashboard";

/* PRICING SYSTEM */
import PricingOverview from "./pages/pricing/index";
import PricingDetail from "./pages/pricing/[slug]";

/* SYSTEM */
import NotFound from "./pages/notfound/NotFound";
import Layout from "./pages/Layout";

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
      { path: "members", element: <Members /> },
      { path: "join", element: <JoinCollective /> },
      { path: "admin", element: <AdminDashboard /> },

      /* PRICING ROUTES */
      { path: "pricing", element: <PricingOverview /> },
      { path: "pricing/:slug", element: <PricingDetail /> },

      { path: "dashboard", element: <Dashboard /> },
      { path: "studio", element: <AIStudio /> },
      { path: "lore", element: <Lore /> },
      { path: "marketplace", element: <Marketplace /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
