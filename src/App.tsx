import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import AuthGate from "./auth/AuthGate";


// Optional members pages
import Workspace from "./pages/workspace/Workspace";
import Billing from "./pages/billing/Billing";
import Members from "./pages/members/Members";


export default function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* PUBLIC WEBSITE */}

        <Route 
          path="/" 
          element={<Home />} 
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />



        {/* MEMBERS AREA */}

        <Route
          path="/dashboard"
          element={
            <AuthGate>
              <Dashboard />
            </AuthGate>
          }
        />



        <Route
          path="/members"
          element={
            <AuthGate>
              <Members />
            </AuthGate>
          }
        />



        {/* AI WORKSPACE */}

        <Route
          path="/workspace"
          element={
            <AuthGate>
              <Workspace />
            </AuthGate>
          }
        />



        {/* BILLING */}

        <Route
          path="/billing"
          element={
            <AuthGate>
              <Billing />
            </AuthGate>
          }
        />



        {/* FALLBACK */}

        <Route
          path="*"
          element={<Home />}
        />


      </Routes>

    </BrowserRouter>

  );
}
