"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/dashboardLayout";

import { fetchUsers } from "@/services/userService";

import { User } from "@/types/user";

import RoleBadge from "@/components/ui/roleBadge";

import toast from "react-hot-toast";

export default function TeamPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) return;

        const data = await fetchUsers(token);

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);

        setError("You do not have permission to view team data.");

        toast.error("You do not have permission to view team data");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const adminCount = users.filter((user) => user.role === "admin").length;

  const memberCount = users.filter((user) => user.role === "member").length;

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "All" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

      return a.name.localeCompare(b.name);
    });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Team
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor team members and role distribution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>

            <h2 className="mt-2 text-3xl font-bold">{users.length}</h2>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Admins</p>

            <h2 className="mt-2 text-3xl font-bold">{adminCount}</h2>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Members</p>

            <h2 className="mt-2 text-3xl font-bold">{memberCount}</h2>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Team Members</h2>

          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 md:max-w-sm"
            />

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="All">All Roles</option>
              <option value="admin">Admins</option>
              <option value="member">Members</option>
            </select>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading users...</p>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
              {error}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                No matching team members found.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search or role filter.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Users will appear here after registration.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  Team Overview
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This view is available to administrators and provides
                  visibility into registered users and role distribution across
                  the platform.
                </p>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Email</th>
                    <th className="py-3 text-left">Role</th>
                    <th className="py-3 text-left">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-gray-100 dark:text-gray-900">
                            {user.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-4">{user.email}</td>

                      <td className="py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
