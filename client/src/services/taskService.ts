import { Task } from "@/types/task";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:5000/api/tasks");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await response.json();

  return result.data;
};