"use client";

import { useState } from "react";
import { CreateProjectInput } from "@/services/projectService";
import { Project } from "@/types/project";

interface AddProjectFormProps {
  onAddProject: (project: CreateProjectInput) => void;
}

const AddProjectForm = ({ onAddProject }: AddProjectFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Project["status"]>("Planning");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddProject({
      name,
      description,
      status,
    });

    setName("");
    setDescription("");
    setStatus("Planning");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Add Project
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />

        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Project["status"])}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        >
          <option className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            Planning
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            Active
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            Completed
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;