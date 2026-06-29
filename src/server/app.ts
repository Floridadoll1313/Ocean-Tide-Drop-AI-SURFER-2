// server/src/app.ts
import express from "express";
import cors from "cors";
import githubRoutes from "./routes/github";
import projectRoutes from "./routes/projects";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);
app.use("/api/projects", projectRoutes);

export default app;