"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { UpdateTaskInput } from "@/services/taskService";
import { Project } from "@/types/project";

interface EditTaskModalProps {
  task: Task;
  projects: Project[];
  onClose: () => void;
  onUpdateTask: (taskId: number, taskData: UpdateTaskInput) => void;
}

const EditTaskModal = ({
  task,
  projects,
  onClose,
  onUpdateTask,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [assignee, setAssignee] = useState(task.assignee);
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [projectId, setProjectId] = useState(
    task.projectId ? String(task.projectId) : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateTask(task.id, {
      title,
      assignee,
      status,
      priority,
      dueDate,
      projectId: projectId ? Number(projectId) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          <input
            required
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          >
            <option
              value=""
              className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
            >
              No Project
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
                className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
              >
                {project.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
            </select>

            <input
              required
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm dark:border-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
