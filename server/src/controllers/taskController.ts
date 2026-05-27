import { Request, Response } from "express";
import { tasks } from "../data/tasks";
import { Task } from "../types/task";

export const getTasks = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const createTask = (req: Request, res: Response) => {
  const { title, assignee, status, priority, dueDate } = req.body;

  if (!title || !assignee || !status || !priority || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const validStatuses = ["Pending", "In Progress", "Review", "Completed"];
  const validPriorities = ["Low", "Medium", "High"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority value",
    });
  }

  const isValidDate = !Number.isNaN(Date.parse(dueDate));

  if (!isValidDate) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date",
    });
  }

  const newTask: Task = {
    id: tasks.length + 1,
    title,
    assignee,
    status,
    priority,
    dueDate,
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask,
  });
};

export const updateTaskStatus = (
  req: Request,
  res: Response
) => {
  const taskId = Number(req.params.id);

  const { status } = req.body;

  const validStatuses = [
    "Pending",
    "In Progress",
    "Review",
    "Completed",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  task.status = status;

  res.status(200).json({
    success: true,
    data: task,
  });
};