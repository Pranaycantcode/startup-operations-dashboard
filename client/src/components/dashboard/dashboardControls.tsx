"use client";

interface DashboardControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedPriority: string;
  setSelectedPriority: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const DashboardControls = ({
  searchTerm,
  setSearchTerm,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
}: DashboardControlsProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 md:w-80"
      />

      <div className="flex flex-col gap-3 md:flex-row">
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardControls;