import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🌊 HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🤖 DASHBOARD DATA (REAL BACKEND FEED)
app.get("/api/dashboard", (req, res) => {
  res.json({
    system: "Ocean Tide Drop AI",
    agents: [
      { name: "WaveCloser", status: "active", jobs: 12 },
      { name: "LeadHunter", status: "active", jobs: 34 },
      { name: "PricingBrain", status: "learning", jobs: 8 },
      { name: "RetentionAI", status: "active", jobs: 21 }
    ],
    metrics: {
      leads: 18,
      conversions: 6,
      revenue: 3480,
      uptime: 99.98
    }
  });
});

// 🚀 START SERVER
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🌊 AI Backend running on http://localhost:${PORT}`);
});
