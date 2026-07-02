import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🌊 HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    system: "Ocean Tide Drop AI",
    time: new Date().toISOString(),
  });
});

// 🤖 AI STATUS ENDPOINT (fake but structured for later AI wiring)
app.get("/api/status", (req, res) => {
  res.json({
    agents: 142,
    leads: 18,
    revenue: "$3,480/mo simulated",
    uptime: "99.98%",
    mode: "AI Operating System Layer 1",
  });
});

// 💰 STRIPE / BILLING HOOK PLACEHOLDER (real hook later)
app.post("/api/webhook/stripe", (req, res) => {
  console.log("Stripe event received:", req.body);
  res.sendStatus(200);
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🌊 AI OS Server running on http://localhost:${PORT}`);
});
