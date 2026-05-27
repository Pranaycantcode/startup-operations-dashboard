"use client";

import { Task } from "@/types/task";

interface TaskStatusSelectProps {
  currentStatus: Task["status"];
  onChangeStatus: (status: Task["status"]) => void;
}

const statuses: Task["status"][] = [
  "Pending",
  "In Progress",
  "Review",
  "Completed",
];

const TaskStatusSelect = ({
  currentStatus,
  onChangeStatus,
}: TaskStatusSelectProps) => {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChangeStatus(e.target.value as Task["status"])}
      className="rounded-xl border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 outline-none focus:border-gray-900"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default TaskStatusSelect;