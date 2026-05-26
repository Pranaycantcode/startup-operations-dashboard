import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Fix onboarding workflow",
    assignee: "Pranay",
    status: "In Progress",
    priority: "High",
    dueDate: "May 28",
  },
  {
    id: 2,
    title: "Sprint review deployment",
    assignee: "Rahul",
    status: "Review",
    priority: "Medium",
    dueDate: "May 30",
  },
  {
    id: 3,
    title: "CRM schema cleanup",
    assignee: "Aditi",
    status: "Completed",
    priority: "Low",
    dueDate: "June 2",
  },
];