import { prisma } from "../config/prisma";

interface LogActivityInput {
  type: string;
  message: string;
  entity: string;
  entityId?: number;
}

export const logActivity = async ({
  type,
  message,
  entity,
  entityId,
}: LogActivityInput) => {
  await prisma.activity.create({
    data: {
      type,
      message,
      entity,
      entityId,
    },
  });
};