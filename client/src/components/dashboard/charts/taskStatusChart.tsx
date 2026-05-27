"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Task } from "@/types/task";

interface TaskStatusChartProps {
  tasks: Task[];
}

const statusColors: Record<string, string> = {
  Pending: "#9ca3af",
  "In Progress": "#3b82f6",
  Review: "#f59e0b",
  Completed: "#22c55e",
};

const TaskStatusChart = ({ tasks }: TaskStatusChartProps) => {
  const data = ["Pending", "In Progress", "Review", "Completed"].map(
    (status) => ({
      name: status,
      value: tasks.filter((task) => task.status === status).length,
    })
  );

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 ">
        Status Distribution
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={statusColors[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatusChart;