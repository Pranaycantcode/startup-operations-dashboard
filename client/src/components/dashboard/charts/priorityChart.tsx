"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Task } from "@/types/task";

interface PriorityChartProps {
  tasks: Task[];
}

const PriorityChart = ({ tasks }: PriorityChartProps) => {
  const data = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    tasks: tasks.filter((task) => task.priority === priority).length,
  }));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Priority Load
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriorityChart;