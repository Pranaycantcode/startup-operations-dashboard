import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../middleware/protect";

const router = Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

export default router;