"use client";

import { useMemo, useState } from "react";

import MainLayout from "@/components/layout/dashboardLayout";
import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";
import DashboardControls from "@/components/dashboard/dashboardControls";

import { mockTasks } from "../data/mockData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPriority =
        selectedPriority === "All" || task.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === "All" || task.status === selectedStatus;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [searchTerm, selectedPriority, selectedStatus]);

  return (
    <MainLayout>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatsCard title="Total Tasks" value={String(mockTasks.length)} />
        <StatsCard title="Visible Tasks" value={String(filteredTasks.length)} />
        <StatsCard
          title="Completed"
          value={String(mockTasks.filter((task) => task.status === "Completed").length)}
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

      <TaskTable tasks={filteredTasks} />
    </MainLayout>
  );
}