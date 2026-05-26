import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Merchant onboarding flow",
    assignee: "Pranay",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-06-12",
  },
  {
    id: 2,
    title: "Campaign analytics panel",
    assignee: "Rahul",
    priority: "Medium",
    status: "Review",
    dueDate: "2026-06-18",
  },
  {
    id: 3,
    title: "CRM migration",
    assignee: "Ananya",
    priority: "High",
    status: "Completed",
    dueDate: "2026-06-20",
  },
];
console.log("mockData loaded:", mockTasks); 