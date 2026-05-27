interface statsCardProps {
  title: string;
  value: string;
}

const statsCard = ({ title, value }: statsCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-black dark:text-white">{value}</h2>
    </div>
  );
};

export default statsCard;