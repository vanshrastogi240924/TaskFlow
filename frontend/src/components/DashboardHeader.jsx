import { Link } from "react-router-dom";
import { Sun } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function DashboardHeader({ displayName, logout }) {
  return (
    <>
      <header className="bg-white dark:bg-slate-900 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-4xl font-extrabold text-cyan-600">
            TaskFlow
          </h1>

          <div className="flex items-center gap-3">

            <ThemeToggle />

            <Link
              to="/calendar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              Calendar
            </Link>

            <Link
              to="/profile"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl"
            >
              Profile
            </Link>

            <Link
              to="/add-task"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl"
            >
              Add Task
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 mt-8">

        <div className="flex items-center gap-5">

          <div className="bg-yellow-100 p-4 rounded-full">

            <Sun
              size={34}
              className="text-yellow-500"
            />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-slate-800 dark:text-white">
              Good Morning,
            </h2>

            <h3 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
              {displayName} 👋
            </h3>

            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Stay focused and make today productive 🚀
            </p>

          </div>

        </div>

      </section>
    </>
  );
}

export default DashboardHeader;