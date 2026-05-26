interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-600",
  Review: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Pending: "bg-gray-200 text-gray-700",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;