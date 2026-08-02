import { Routes, Route, Navigate } from "react-router-dom";


// Public Pages
import NewLanding from "./pages/landing/NewLanding";
import WaveCheck from "./pages/wavecheck/WaveCheck";
import Login from "./pages/login/Login";
import Pricing from "./pages/pricing/Pricing";


// Members Layout
import MembersLayout from "./components/members/MembersLayout";


// Members Pages
import HeadquartersBridge from "./components/members/HeadquartersBridge";

import Dashboard from "./pages/dashboard/Dashboard";
import Agents from "./pages/members/Agents";
import Automation from "./pages/members/Automation";
import Workspace from "./pages/members/Workspace";
import Revenue from "./pages/members/Revenue";
import Leads from "./pages/members/Leads";
import Scanner from "./pages/members/Scanner";



export default function App() {


  return (

    <Routes>


      {/* PUBLIC WEBSITE */}


      <Route
        path="/"
        element={<NewLanding />}
      />


      <Route
        path="/wave-check"
        element={<WaveCheck />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/pricing"
        element={<Pricing />}
      />


      {/* Legacy / shortcut redirects to members */}
      <Route path="/dashboard" element={<Navigate to="/members/dashboard" replace />} />
      <Route path="/tools" element={<Navigate to="/members/agents" replace />} />
      <Route path="/command-center" element={<Navigate to="/members/dashboard" replace />} />
      <Route path="/billing" element={<Navigate to="/members/revenue" replace />} />


      {/* MEMBERS AREA */}


      <Route
        path="/members"
        element={<MembersLayout />}
      >


        {/* Members Home */}

        <Route
          index
          element={<HeadquartersBridge />}
        />


        {/* Command Center */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />


        {/* AI Tools */}

        <Route
          path="agents"
          element={<Agents />}
        />


        <Route
          path="automation"
          element={<Automation />}
        />


        <Route
          path="workspace"
          element={<Workspace />}
        />


        <Route
          path="leads"
          element={<Leads />}
        />


        <Route
          path="revenue"
          element={<Revenue />}
        />


        <Route
          path="scanner"
          element={<Scanner />}
        />


      </Route>


    </Routes>

  );

}
