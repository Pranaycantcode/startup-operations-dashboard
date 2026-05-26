import MainLayout from "@/components/layout/dashboardLayout";
import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";
import { mockTasks } from "../data/mockData";

export default function Home() {
  return (
    <MainLayout>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatsCard title="Active Tasks" value="24" />
        <StatsCard title="Pending Reviews" value="8" />
        <StatsCard title="Completed Sprints" value="12" />
      </div>

      <TaskTable tasks={mockTasks} />
    </MainLayout>
  );
}