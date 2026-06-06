"use client";

import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ui/themeToggle";
import UserMenu from "@/components/auth/userMenu";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white px-5 py-4 dark:bg-gray-900 md:px-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl">
          Operations Dashboard
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monitor workflows, tasks, and execution health
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <UserMenu />

        <button
          onClick={onOpenSidebar}
          className="rounded-xl border border-gray-200 dark:border-gray-800 p-2 md:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
