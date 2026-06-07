"use client";

import { Activity } from "@/types/activity";
import { useState } from "react";

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  error?: string;
}

const getActivityColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "created":
      return "bg-green-500";
    case "updated":
      return "bg-blue-500";
    case "deleted":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const formatActivityTime = (date: string) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const ActivityFeed = ({
  activities,
  loading = false,
  error = "",
}: ActivityFeedProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const activityTypes = [
    "All",
    ...Array.from(new Set(activities.map((activity) => activity.type))),
  ];

  const filteredActivities = activities.filter((activity) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      activity.message.toLowerCase().includes(search) ||
      activity.type.toLowerCase().includes(search) ||
      activity.entity.toLowerCase().includes(search);

    const matchesType =
      selectedType === "All" || activity.type === selectedType;

    return matchesSearch && matchesType;
  });

  const hasActiveFilters = searchTerm.trim() !== "" || selectedType !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading activities...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            No recent activity.
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create or update tasks and projects to see activity here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Latest operational updates across tasks and projects.
        </p>
      </div>

      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Showing {filteredActivities.length} of {activities.length} activities
      </p>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search activity..."
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 md:max-w-sm"
        />

        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          >
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Types" : type}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            No matching activities found.
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try searching with a different keyword.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 h-3 w-3 rounded-full ${getActivityColor(
                    activity.type,
                  )}`}
                />

                <div className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {activity.type}
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatActivityTime(activity.createdAt)}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                  {activity.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
