import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
} from "../controllers/projectController";
import { protect } from "../middleware/protect";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);

router.post("/", protect, requireRole(["admin"]), createProject);

export default router;
