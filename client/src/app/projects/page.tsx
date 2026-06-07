"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/dashboardLayout";
import ProjectCard from "@/components/projects/projectCard";
import AddProjectForm from "@/components/projects/addProjectForm";
import toast from "react-hot-toast";

import { Project } from "@/types/project";
import {
  createProject,
  fetchProjects,
  CreateProjectInput,
} from "@/services/projectService";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);

        toast.error("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleAddProject = async (projectData: CreateProjectInput) => {
    try {
      const newProject = await createProject(projectData);
      setProjects((prevProjects) => [newProject, ...prevProjects]);
      toast.success("Project created successfully");
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track operational initiatives and execution pipelines.
        </p>
      </div>

      <AddProjectForm onAddProject={handleAddProject} />

      {isLoading ? (
        <div className="rounded-2xl bg-white p-6 text-gray-500 shadow-sm dark:bg-gray-900 dark:text-gray-400">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          No projects yet. Add your first project to start tracking.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
