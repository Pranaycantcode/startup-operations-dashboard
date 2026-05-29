import { prisma } from "../config/prisma";
import { logActivity } from "./activityLogger";

export const syncProjectStatus = async (projectId?: number | null) => {
  if (!projectId) return;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      tasks: true,
    },
  });

  if (!project) return;

  let nextStatus = "Planning";

  if (project.tasks.length > 0) {
    const allTasksCompleted = project.tasks.every((task: { status: string }) => task.status === "Completed");

    nextStatus = allTasksCompleted ? "Completed" : "Active";
  }

  if (project.status === nextStatus) return;

  const updatedProject = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      status: nextStatus,
    },
  });

  await logActivity({
    type: "PROJECT_STATUS_SYNCED",
    message: `Project "${updatedProject.name}" status changed to ${nextStatus}`,
    entity: "project",
    entityId: updatedProject.id,
  });
};