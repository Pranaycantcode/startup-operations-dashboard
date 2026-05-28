import { Task } from "@/types/task";
import StatsCard from "@/components/dashboard/statsCard";
import TaskStatusChart from "@/components/dashboard/charts/taskStatusChart";
import PriorityChart from "@/components/dashboard/charts/priorityChart";
import { getDeadlineStatus, getDaysUntilDeadline } from "@/lib/deadlineUtils";

interface AnalyticsSectionProps {
  tasks: Task[];
  visibleTasks: Task[];
}

const AnalyticsSection = ({ tasks, visibleTasks }: AnalyticsSectionProps) => {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const overdueTasks = tasks.filter(
    (task) => getDeadlineStatus(task.dueDate) === "Overdue"
  ).length;

  const dueTodayTasks = tasks.filter(
    (task) => getDeadlineStatus(task.dueDate) === "Due Today"
  ).length;

  const dueThisWeekTasks = tasks.filter((task) => {
    const days = getDaysUntilDeadline(task.dueDate);

    return days !== null && days >= 0 && days <= 7;
  }).length;

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        <StatsCard title="Total Tasks" value={String(tasks.length)} />
        <StatsCard title="Visible Tasks" value={String(visibleTasks.length)} />
        <StatsCard title="Completion Rate" value={`${completionRate}%`} />
        <StatsCard title="Overdue" value={String(overdueTasks)} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <StatsCard title="Due Today" value={String(dueTodayTasks)} />
        <StatsCard title="Due This Week" value={String(dueThisWeekTasks)} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TaskStatusChart tasks={tasks} />
        <PriorityChart tasks={tasks} />
      </div>
    </>
  );
};

export default AnalyticsSection;