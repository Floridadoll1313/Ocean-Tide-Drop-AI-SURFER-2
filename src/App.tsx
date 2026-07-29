import { Routes, Route } from "react-router-dom";

import NewLanding from "./pages/landing/NewLanding";
import WaveCheck from "./pages/wavecheck/WaveCheck";
import Login from "./pages/login/Login";
import Pricing from "./pages/pricing/Pricing";

import MembersLayout from "./components/members/MembersLayout";

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


      {/* PUBLIC SITE */}

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



      {/* MEMBERS AREA */}

      <Route
        path="/members"
        element={<MembersLayout />}
      >

        <Route
          index
          element={<HeadquartersBridge />}
        />


        <Route
          path="dashboard"
          element={<Dashboard />}
        />


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
          path="revenue"
          element={<Revenue />}
        />


        <Route
          path="leads"
          element={<Leads />}
        />


        <Route
          path="scanner"
          element={<Scanner />}
        />


      </Route>


    </Routes>

  );

}