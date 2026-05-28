import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { logActivity } from "../utils/activityLogger";

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

    await logActivity({
      type: "PROJECT_CREATED",
      message: `Project "${project.name}" was created`,
      entity: "project",
      entityId: project.id,
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

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};
