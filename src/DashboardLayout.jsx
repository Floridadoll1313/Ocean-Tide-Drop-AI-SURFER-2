import { useState } from "react";

function Sidebar({ setView }) {
  return (
    <div style={styles.sidebar}>
      <h2>🌊 Ocean Tide</h2>

      <button onClick={() => setView("home")}>Dashboard</button>
      <button onClick={() => setView("tools")}>AI Tools</button>
      <button onClick={() => setView("billing")}>Billing</button>
      <button onClick={() => setView("profile")}>Profile</button>
    </div>
  );
}

function ToolsGrid() {
  return (
    <div style={styles.grid}>
      <div style={styles.card}>🧠 Content Generator</div>
      <div style={styles.card}>📈 Lead Finder</div>
      <div style={styles.card}>🌊 Automation Bot</div>
      <div style={styles.card}>💬 AI Chat Assistant</div>
    </div>
  );
}

function MainView({ view }) {
  if (view === "tools") return <ToolsGrid />;

  if (view === "billing") return <h2>💳 Billing (Stripe coming next)</h2>;

  if (view === "profile") return <h2>👤 Profile Settings</h2>;

  return <h2>🌊 Welcome to your Dashboard</h2>;
}

export default function DashboardLayout() {
  const [view, setView] = useState("home");

  return (
    <div style={styles.layout}>
      <Sidebar setView={setView} />

      <div style={styles.main}>
        <MainView view={view} />
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif"
  },
  sidebar: {
    width: 220,
    background: "#0b1b2b",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  main: {
    flex: 1,
    padding: 30,
    background: "#f5f7fb"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }
};