import { Task } from "@/types/task";

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Omit<Task, "id">;

export const fetchTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch("http://localhost:5000/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await response.json();

  return result.data;
};

export const createTask = async (
  taskData: CreateTaskInput
): Promise<Task> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `http://localhost:5000/api/tasks/${taskId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const deleteTask = async (taskId: number): Promise<Task> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  const result = await response.json();

  return result.data;
};


export const updateTask = async (
  taskId: number,
  taskData: UpdateTaskInput
): Promise<Task> => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const result = await response.json();

  return result.data;
};