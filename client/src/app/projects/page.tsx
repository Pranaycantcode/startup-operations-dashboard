import MainLayout from "@/components/layout/dashboardLayout";

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Project-level workflow tracking will be built here.
        </p>
      </div>
    </MainLayout>
  );
}