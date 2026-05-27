import { Task } from "@/types/task";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: "Planning" | "Active" | "Completed";
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
}