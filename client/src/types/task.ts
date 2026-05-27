export interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Review" | "Completed";
  dueDate: string;
  projectId?: number | null;
}