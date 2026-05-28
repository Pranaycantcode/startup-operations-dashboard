export type DeadlineStatus = "Overdue" | "Due Today" | "Upcoming" | "No Date";

export const getDeadlineStatus = (dueDate: string): DeadlineStatus => {
  if (!dueDate) return "No Date";

  const today = new Date();
  const deadline = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  if (Number.isNaN(deadline.getTime())) return "No Date";

  const differenceInMs = deadline.getTime() - today.getTime();
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  if (differenceInDays < 0) return "Overdue";
  if (differenceInDays === 0) return "Due Today";

  return "Upcoming";
};

export const getDaysUntilDeadline = (dueDate: string): number | null => {
  if (!dueDate) return null;

  const today = new Date();
  const deadline = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  if (Number.isNaN(deadline.getTime())) return null;

  const differenceInMs = deadline.getTime() - today.getTime();

  return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
};