import { tasks } from "@/data/mockData";
import StatusBadge from "@/components/ui/statusBadge";
import PriorityBadge from "@/components/ui/priorityBadge";

const TaskTable = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Active Tasks</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm text-gray-500">
            <th className="pb-3">Task</th>
            <th className="pb-3">Owner</th>
            <th className="pb-3">Priority</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b text-sm">
              <td className="py-4">{task.title}</td>
              <td>{task.owner}</td>
              <td>
                <PriorityBadge priority={task.priority} />
              </td>
              <td>
                <StatusBadge status={task.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
