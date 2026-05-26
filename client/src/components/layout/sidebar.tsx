import { LayoutDashboard, FolderKanban, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-5">
      <h1 className="mb-10 text-2xl font-bold">OpsBoard</h1>

      <nav className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100">
          <FolderKanban size={18} />
          <span>Projects</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100">
          <Users size={18} />
          <span>Team</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;