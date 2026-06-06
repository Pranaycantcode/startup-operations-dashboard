interface RoleBadgeProps {
  role: string;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  const isAdmin = role === "admin";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        isAdmin
          ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300"
          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      }`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;