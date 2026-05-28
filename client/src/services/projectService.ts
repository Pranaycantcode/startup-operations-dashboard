import { Project } from "@/types/project";

export type CreateProjectInput = Pick<
  Project,
  "name" | "description" | "status"
>;

const API_URL = "http://localhost:5000/api/projects";

export const fetchProjects = async (): Promise<Project[]> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch("http://localhost:5000/api/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
};

export const createProject = async (
  projectData: CreateProjectInput
): Promise<Project> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  const result = await response.json();

  return result.data;
};

export const fetchProjectById = async (
  projectId: number
): Promise<Project> => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const result = await response.json();

  return result.data;
};