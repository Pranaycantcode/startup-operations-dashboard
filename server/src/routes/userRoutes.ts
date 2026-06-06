import express from "express";
import { getUsers } from "../controllers/userController";
import { protect } from "../middleware/protect";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.get("/", protect, requireRole(["admin"]), getUsers);

export default router;