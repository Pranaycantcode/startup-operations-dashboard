"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 md:px-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
          Operations Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Monitor workflows, tasks, and execution health
        </p>
      </div>

      <button
        onClick={onOpenSidebar}
        className="rounded-xl border border-gray-200 p-2 md:hidden"
      >
        <Menu size={20} />
      </button>
    </header>
  );
};

export default Header;