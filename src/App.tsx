import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="/headquarters"
        element={
          <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <h1 className="text-5xl font-bold">
              🌊 Headquarters Test Online
            </h1>
          </div>
        }
      />
    </Routes>
  );
}
