import { Request, Response } from "express";
import { tasks } from "../data/tasks";

export const getTasks = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: tasks,
  });
};