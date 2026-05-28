"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/dashboardLayout";
import TaskTable from "@/components/dashboard/taskTable";
import ProjectStatusBadge from "@/components/ui/projectStatusBadge";

import { Project } from "@/types/project";
import { Task } from "@/types/task";
import { fetchProjectById } from "@/services/projectService";
import {
  updateTaskStatus,
  deleteTask,
} from "@/services/taskService";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = Number(params.id);

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);

        const data = await fetchProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const projectTasks = project?.tasks || [];

  const completedTasks = useMemo(() => {
    return projectTasks.filter((task) => task.status === "Completed").length;
  }, [projectTasks]);

  const progress = useMemo(() => {
    if (projectTasks.length === 0) return 0;

    return Math.round((completedTasks / projectTasks.length) * 100);
  }, [completedTasks, projectTasks.length]);

  const handleUpdateStatus = async (
    taskId: number,
    status: Task["status"]
  ) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);

      setProject((prevProject) => {
        if (!prevProject) return prevProject;

        return {
          ...prevProject,
          tasks: prevProject.tasks?.map((task) =>
            task.id === taskId ? updatedTask : task
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);

      setProject((prevProject) => {
        if (!prevProject) return prevProject;

        return {
          ...prevProject,
          tasks: prevProject.tasks?.filter((task) => task.id !== taskId),
        };
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          Loading project...
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          Project not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {project.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </div>

          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Project Progress
            </span>

            <span className="font-medium text-gray-900 dark:text-gray-100">
              {progress}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-2 rounded-full bg-gray-900 transition-all dark:bg-gray-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {completedTasks} of {projectTasks.length} tasks completed
          </p>
        </div>
      </div>

      <TaskTable
        tasks={projectTasks}
        onUpdateStatus={handleUpdateStatus}
        onDeleteTask={handleDeleteTask}
        onEditTask={() => {}}
      />
    </DashboardLayout>
  );
}