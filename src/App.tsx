import { Routes, Route } from "react-router-dom";

import WaveCheck from "./pages/wavecheck/WaveCheck";

import NewLanding from "./pages/landing/NewLanding";
import Login from "./pages/login/Login";
import Pricing from "./pages/pricing/Pricing";
import Dashboard from "./pages/dashboard/Dashboard";

import MembersLayout from "./components/members/MembersLayout";


// Headquarters
import Headquarters from "./pages/members/Headquarters";


// Member tools
import Agents from "./pages/members/Agents";
import Automation from "./pages/members/Automation";
import Workspace from "./pages/members/Workspace";
import Revenue from "./pages/members/Revenue";
import Leads from "./pages/members/Leads";
import Scanner from "./pages/members/Scanner";


export default function App() {

  return (

    <Routes>


      {/* Public Website */}

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



      {/* Members Headquarters */}

      <Route
        element={<MembersLayout />}
      >


        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        <Route
          path="/headquarters"
          element={<Headquarters />}
        />



        <Route
          path="/members/agents"
          element={<Agents />}
        />


        <Route
          path="/members/automation"
          element={<Automation />}
        />


        <Route
          path="/members/workspace"
          element={<Workspace />}
        />


        <Route
          path="/members/revenue"
          element={<Revenue />}
        />


        <Route
          path="/members/leads"
          element={<Leads />}
        />


        <Route
          path="/members/scanner"
          element={<Scanner />}
        />


      </Route>


    </Routes>

  );

}
