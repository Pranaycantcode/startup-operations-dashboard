import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;