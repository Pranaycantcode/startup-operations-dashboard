export interface Task {
  id: number;
  title: string;
  owner: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Review" | "Completed";
  deadline: string;
}