import MainLayout from "@/components/layout/dashboardLayout";

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="mt-2 text-sm text-gray-500">
          Project-level workflow tracking will be built here.
        </p>
      </div>
    </MainLayout>
  );
}