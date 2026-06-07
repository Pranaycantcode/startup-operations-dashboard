"use client";

import { useEffect, useMemo, useState } from "react";

import MainLayout from "@/components/layout/dashboardLayout";
//import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";
import DashboardControls from "@/components/dashboard/dashboardControls";
import AnalyticsSection from "@/components/dashboard/analyticsSection";
import AddTaskForm from "@/components/dashboard/addTaskForm";
import EditTaskModal from "@/components/dashboard/editTaskModal";
import { Project } from "@/types/project";
import { fetchProjects } from "@/services/projectService";
import { Activity } from "@/types/activity";
import { fetchActivities } from "@/services/activityService";
import ActivityTimeline from "@/components/activity/activityTimeline";
import ProtectedRoute from "@/components/auth/protectedRoute";
import toast from "react-hot-toast";
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        const taskData = await fetchTasks();
        const projectData = await fetchProjects();
        const activityData = await fetchActivities();

        setTasks(taskData);
        setProjects(projectData);
        setActivities(activityData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
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

  const refreshActivities = async () => {
    try {
      const activityData = await fetchActivities();
      setActivities(activityData);
    } catch (error) {
      console.error("Failed to refresh activities:", error);
    }
  };

  const handleAddTask = async (taskData: CreateTaskInput) => {
    try {
      const newTask = await createTask(taskData);

      setTasks((prevTasks) => [...prevTasks, newTask]);
      await refreshActivities();

      toast.success("Task created successfully");
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
      await refreshActivities();
      toast.success("Task status updated");
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      await refreshActivities();
      toast.success("Task deleted");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
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
      await refreshActivities();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <ProtectedRoute>
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

        <div className="mb-8">
          <ActivityTimeline activities={activities} />
        </div>

        <AddTaskForm onAddTask={handleAddTask} projects={projects} />

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
            projects={projects}
            onClose={() => setSelectedTask(null)}
            onUpdateTask={handleUpdateTask}
          />
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}
