"use client";

import { useEffect, useMemo, useState } from "react";

import MainLayout from "@/components/layout/dashboardLayout";
import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";
import DashboardControls from "@/components/dashboard/dashboardControls";

import { Task } from "@/types/task";
import { fetchTasks } from "@/services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPriority =
        selectedPriority === "All" || task.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === "All" || task.status === selectedStatus;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchTerm, selectedPriority, selectedStatus]);

  return (
    <MainLayout>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatsCard title="Total Tasks" value={String(tasks.length)} />
        <StatsCard title="Visible Tasks" value={String(filteredTasks.length)} />
        <StatsCard
          title="Completed"
          value={String(tasks.filter((task) => task.status === "Completed").length)}
        />
      </div>

      <DashboardControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {isLoading ? (
        <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm">
          Loading tasks...
        </div>
      ) : (
        <TaskTable tasks={filteredTasks} />
      )}
    </MainLayout>
  );
}