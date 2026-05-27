import { Project } from "@/types/project";
import ProjectStatusBadge from "@/components/ui/projectStatusBadge";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const totalTasks = project.tasks?.length || 0;

  const completedTasks =
    project.tasks?.filter((task) => task.status === "Completed").length || 0;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {project.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Progress
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {progress}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-2 rounded-full bg-gray-900 transition-all dark:bg-gray-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        Created: {new Date(project.createdAt).toLocaleDateString("en-IN")}
      </div>
    </div>
  );
};

export default ProjectCard;