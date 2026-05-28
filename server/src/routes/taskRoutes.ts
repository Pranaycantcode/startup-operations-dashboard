import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../middleware/protect";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.get("/", protect, getTasks);

router.post("/", protect, requireRole(["admin"]), createTask);

router.put("/:id", protect, requireRole(["admin"]), updateTask);

router.patch("/:id/status", protect, requireRole(["admin"]), updateTaskStatus);

router.delete("/:id", protect, requireRole(["admin"]), deleteTask);

export default router;
