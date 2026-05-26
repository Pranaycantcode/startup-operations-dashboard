interface PriorityBadgeProps {
  priority: string;
}

const priorityStyles: Record<string, string> = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
};

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;