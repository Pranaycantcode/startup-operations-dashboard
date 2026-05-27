"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import MobileSidebar from "./mobileSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Sidebar />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;