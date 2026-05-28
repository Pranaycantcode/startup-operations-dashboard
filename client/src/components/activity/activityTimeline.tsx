import { Activity } from "@/types/activity";

interface ActivityTimelineProps {
  activities: Activity[];
}

const getActivityLabel = (type: string) => {
  if (type.includes("CREATED")) return "Created";
  if (type.includes("UPDATED")) return "Updated";
  if (type.includes("DELETED")) return "Deleted";
  return "Activity";
};

const getActivityDotClass = (type: string) => {
  if (type.includes("CREATED")) {
    return "bg-green-500";
  }

  if (type.includes("UPDATED")) {
    return "bg-blue-500";
  }

  if (type.includes("DELETED")) {
    return "bg-red-500";
  }

  return "bg-gray-500";
};

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Latest operational updates across tasks and projects.
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No activity recorded yet.
        </p>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className="mt-1 flex flex-col items-center">
                <span
                  className={`h-3 w-3 rounded-full ${getActivityDotClass(
                    activity.type
                  )}`}
                />

                <span className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-800" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {getActivityLabel(activity.type)}
                  </span>

                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(activity.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
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

export default ActivityTimeline;