import MainLayout from "@/components/layout/dashboardLayout";

export default function TeamPage() {
  return (
    <MainLayout>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <p className="mt-2 text-sm text-gray-500">
          Team workload and contributor tracking will be built here.
        </p>
      </div>
    </MainLayout>
  );
}