import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

import {
  User,
  Mail,
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);

  const navigate = useNavigate();

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-center p-6 transition-colors duration-300">

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="bg-cyan-100 dark:bg-cyan-900 p-6 rounded-full">

            <User
              size={70}
              className="text-cyan-600"
            />

          </div>

          <h1 className="text-5xl font-bold mt-6 dark:text-white">
            {user?.name}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-gray-300">
            <Mail size={20} />
            <span className="text-lg">
              {user?.email}
            </span>
          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <StatCard
            icon={<ClipboardList size={28} />}
            title="Total Tasks"
            value={tasks.length}
            color="text-cyan-600"
          />

          <StatCard
            icon={<CheckCircle size={28} />}
            title="Completed"
            value={completed}
            color="text-green-600"
          />

          <StatCard
            icon={<Clock size={28} />}
            title="Pending"
            value={pending}
            color="text-orange-500"
          />

          <StatCard
            icon={<TrendingUp size={28} />}
            title="Completion"
            value={`${completionRate}%`}
            color="text-purple-600"
          />

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-5 mt-12">

          <Link
            to="/dashboard"
            className="bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl text-center text-lg font-semibold transition"
          >
            ← Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">

      <div className={`flex items-center gap-3 ${color}`}>

        {icon}

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

      </div>

      <h3 className="text-5xl font-bold mt-6 dark:text-white">
        {value}
      </h3>

    </div>
  );
}

export default Profile;