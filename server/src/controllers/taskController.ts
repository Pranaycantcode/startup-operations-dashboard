import { Request, Response } from "express";
import { prisma } from "../config/prisma"; //  Fixed!

const validStatuses = ["Pending", "In Progress", "Review", "Completed"];
const validPriorities = ["Low", "Medium", "High"];

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
  console.error("Error fetching tasks:", error); // Helps you debug instantly!
  res.status(500).json({
    success: false,
    message: "Failed to fetch tasks",
  });
}
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, assignee, status, priority, dueDate } = req.body;

    if (!title || !assignee || !status || !priority || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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

    const task = await prisma.task.create({
      data: {
        title,
        assignee,
        status,
        priority,
        dueDate,
      },
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update task status",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.status(200).json({
      success: true,
      data: deletedTask,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};