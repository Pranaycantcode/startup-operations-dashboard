import { Task } from "@/types/task";
import PriorityBadge from "@/components/ui/priorityBadge";
import TaskStatusSelect from "@/components/dashboard/taskStatusSelect";

interface TaskTableProps {
  tasks: Task[];
  onUpdateStatus: (taskId: number, status: Task["status"]) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskTable = ({ tasks, onUpdateStatus, onDeleteTask }: TaskTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Active Tasks</h2>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="border-b border-gray-200 text-left text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            <th className="px-6 py-3">Task</th>
            <th className="px-6 py-3">Assignee</th>
            <th className="px-6 py-3">Priority</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Due Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-200 text-sm transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                {task.title}
              </td>

              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{task.assignee}</td>

              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>

              <td className="px-6 py-4">
                <TaskStatusSelect
                  currentStatus={task.status}
                  onChangeStatus={(status) => onUpdateStatus(task.id, status)}
                />
              </td>

              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{task.dueDate}</td>

              <td className="px-6 py-4">
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
