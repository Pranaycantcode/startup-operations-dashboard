"use client";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Operations Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Monitor operational workflows and sprint execution
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-black"
        />

        <div className="h-10 w-10 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Header;