import { Task } from "@/types/task";

export type CreateTaskInput = Omit<Task, "id">;

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:5000/api/tasks");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await response.json();

  return result.data;
};

export const createTask = async (
  taskData: CreateTaskInput
): Promise<Task> => {
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const result = await response.json();

  return result.data;
};

export const updateTaskStatus = async (
  taskId: number,
  status: Task["status"]
): Promise<Task> => {
  const response = await fetch(
    `http://localhost:5000/api/tasks/${taskId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }

  const result = await response.json();

  return result.data;
};