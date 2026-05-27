import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import projectRoutes from "./routes/projectRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

app.get("/", (_req, res) => {
  res.send("API running...");
});

app.use("/api/tasks", taskRoutes);

export default app;