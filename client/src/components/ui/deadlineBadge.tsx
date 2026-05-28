import { getDeadlineStatus, getDaysUntilDeadline } from "@/lib/deadlineUtils";

interface DeadlineBadgeProps {
  dueDate: string;
  taskStatus?: string;
}

const statusStyles = {
  Overdue: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  "Due Today":
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300",
  Upcoming:
    "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
  "No Date": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

const DeadlineBadge = ({ dueDate, taskStatus }: DeadlineBadgeProps) => {
  const status = getDeadlineStatus(dueDate);
  const days = getDaysUntilDeadline(dueDate);

  if (taskStatus === "Completed") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/50 dark:text-green-300">
        Completed
      </span>
    );
  }

  let label: string = status;

  if (status === "Upcoming" && days !== null) {
    label = `${days} day${days === 1 ? "" : "s"} left`;
  }

  if (status === "Overdue" && days !== null) {
    label = `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} late`;
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
};

export default DeadlineBadge;
