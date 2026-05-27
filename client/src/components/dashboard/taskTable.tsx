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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-xl font-semibold text-gray-900">Active Tasks</h2>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr className="border-b text-left text-sm text-gray-500">
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
              className="border-b text-sm transition hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {task.title}
              </td>

              <td className="px-6 py-4 text-gray-600">{task.assignee}</td>

              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>

              <td className="px-6 py-4">
                <TaskStatusSelect
                  currentStatus={task.status}
                  onChangeStatus={(status) => onUpdateStatus(task.id, status)}
                />
              </td>

              <td className="px-6 py-4 text-gray-600">{task.dueDate}</td>

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
