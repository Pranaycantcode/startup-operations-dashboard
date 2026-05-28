import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import projectRoutes from "./routes/projectRoutes";
import activityRoutes from "./routes/activityRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/activities", activityRoutes);

app.get("/", (_req, res) => {
  res.send("API running...");
});

app.use("/api/tasks", taskRoutes);

export default app;