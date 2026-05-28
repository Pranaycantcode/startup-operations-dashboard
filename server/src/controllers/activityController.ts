import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
};