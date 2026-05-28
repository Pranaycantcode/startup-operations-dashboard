"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-500 dark:bg-gray-950 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;