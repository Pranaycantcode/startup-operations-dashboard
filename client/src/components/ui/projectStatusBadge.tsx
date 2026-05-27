import { Project } from "@/types/project";

interface ProjectStatusBadgeProps {
  status: Project["status"];
}

const statusStyles: Record<Project["status"], string> = {
  Planning:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Active:
    "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  Completed:
    "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
};

const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default ProjectStatusBadge;