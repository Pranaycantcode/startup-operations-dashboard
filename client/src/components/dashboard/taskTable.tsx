import { Task } from "@/types/task";
import StatusBadge from "@/components/ui/statusBadge";
import PriorityBadge from "@/components/ui/priorityBadge";
import { mockTasks } from "@/data/mockData";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable = ({ tasks = [] }: TaskTableProps) => {
  console.log("tasks received:", tasks); 
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Task
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Assignee
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Priority
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Due Date
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b transition hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-800">
                {task.title}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {task.owner}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>

              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {task.deadline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;