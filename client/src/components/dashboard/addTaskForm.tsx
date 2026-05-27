"use client";

import { useState } from "react";
import { CreateTaskInput } from "@/services/taskService";

interface AddTaskFormProps {
  onAddTask: (task: CreateTaskInput) => void;
}

const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<CreateTaskInput["status"]>("Pending");
  const [priority, setPriority] =
    useState<CreateTaskInput["priority"]>("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddTask({
      title,
      assignee,
      status,
      priority,
      dueDate,
    });

    setTitle("");
    setAssignee("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Task</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        />

        <input
          required
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assignee"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        />

        <select
          required
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as CreateTaskInput["priority"])
          }
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          required
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as CreateTaskInput["status"])
          }
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due date"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        />
      </div>

      <button
        type="submit"
        className="mt-4 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;