import { Request, Response } from "express";
import { prisma } from "../config/prisma";

const validProjectStatuses = ["Planning", "Active", "Completed"];

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !description || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validProjectStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project status",
      });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};
