import Sidebar from "@/components/layout/sidebar";
import StatsCard from "@/components/dashboard/statsCard";
import TaskTable from "@/components/dashboard/taskTable";

const DashboardPage = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">Operations Dashboard</h1>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatsCard title="Active Tasks" value="24" />
          <StatsCard title="Pending Reviews" value="8" />
          <StatsCard title="Completed Sprints" value="12" />
        </div>

        <TaskTable />
      </main>
    </div>
  );
};

export default DashboardPage;