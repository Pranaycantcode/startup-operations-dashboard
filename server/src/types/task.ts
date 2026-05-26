export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: "Pending" | "In Progress" | "Review" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}