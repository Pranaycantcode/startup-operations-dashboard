"use client";

import { useEffect, useMemo, useState } from "react";

import MainLayout from "@/components/layout/dashboardLayout";
//import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";
import DashboardControls from "@/components/dashboard/dashboardControls";
import AnalyticsSection from "@/components/dashboard/analyticsSection";
import AddTaskForm from "@/components/dashboard/addTaskForm";
import EditTaskModal from "@/components/dashboard/editTaskModal";
import {
  createTask,
  fetchTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/services/taskService";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const handleAddTask = async (taskData: CreateTaskInput) => {
    try {
      const newTask = await createTask(taskData);

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateStatus = async (taskId: number, status: Task["status"]) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleUpdateTask = async (
    taskId: number,
    taskData: UpdateTaskInput,
  ) => {
    try {
      const updatedTask = await updateTask(taskId, taskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );

      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <MainLayout>
      {/* <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatsCard title="Total Tasks" value={String(tasks.length)} />
        <StatsCard title="Visible Tasks" value={String(filteredTasks.length)} />
        <StatsCard
          title="Completed"
          value={String(
            tasks.filter((task) => task.status === "Completed").length,
          )}
        />
      </div>
 */}
      <AnalyticsSection tasks={tasks} visibleTasks={filteredTasks} />

      <AddTaskForm onAddTask={handleAddTask} />

      <DashboardControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {isLoading ? (
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 text-gray-500 shadow-sm">
          Loading tasks...
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTask={handleDeleteTask}
          onEditTask={setSelectedTask}
        />
      )}

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </MainLayout>
  );
}
