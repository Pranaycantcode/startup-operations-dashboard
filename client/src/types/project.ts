export interface Project {
  id: number;
  name: string;
  description: string;
  status: "Planning" | "Active" | "Completed";
  createdAt: string;
  updatedAt: string;
}