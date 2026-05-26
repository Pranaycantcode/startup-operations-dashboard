interface statsCardProps {
  title: string;
  value: string;
}

const statsCard = ({ title, value }: statsCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-black">{value}</h2>
    </div>
  );
};

export default statsCard;