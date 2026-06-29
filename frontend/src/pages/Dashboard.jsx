import { useContext, useMemo, useState } from "react";

import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";

import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import ProductivityInsights from "../components/ProductivityInsights";
import SearchBar from "../components/SearchBar";
import TaskCard from "../components/TaskCard";
import AnalyticsPieChart from "../components/AnalyticsPieChart";
import CategoryBarChart from "../components/CategoryBarChart";
import DeleteModal from "../components/DeleteModal";
import { Link } from "react-router-dom";

function Dashboard() {
  const {
    tasks,
    deleteTask,
    editTask,
    toggleComplete,
  } = useContext(TaskContext);

  const { user, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const displayName = user?.name || "User";

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  const currentStreak = 1;

  const upcomingDeadlines = tasks.filter(
    (task) =>
      !task.completed &&
      task.deadline &&
      new Date(task.deadline) >= new Date()
  ).length;

  const topCategory = useMemo(() => {
    if (tasks.length === 0) return "None";

    const counts = {};

    tasks.forEach((task) => {
      counts[task.category] =
        (counts[task.category] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  }, [tasks]);

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter(
      (task) =>
        categoryFilter === "All" ||
        task.category === categoryFilter
    );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">

      <DashboardHeader
        displayName={displayName}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 pb-10">

        <StatsCards
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          completionRate={completionRate}
        />

        <ProductivityInsights
          currentStreak={currentStreak}
          completedTasks={completedTasks}
          completionRate={completionRate}
          topCategory={topCategory}
          upcomingDeadlines={upcomingDeadlines}
        />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <AnalyticsPieChart tasks={tasks} />
          <CategoryBarChart tasks={tasks} />
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <div className="mt-10">

          <h2 className="text-3xl font-bold dark:text-white mb-6">
            📋 My Tasks
          </h2>

          {filteredTasks.length === 0 ? (

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-12 text-center">

              <div className="text-7xl">
                📋
              </div>

              <h2 className="text-3xl font-bold mt-5 dark:text-white">
                No Tasks Found
              </h2>

              <p className="text-gray-500 mt-3">
                Create your first task.
              </p>

              <Link
                to="/add-task"
                className="inline-block mt-8 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl"
              >
                + Create Task
              </Link>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredTasks.map((task) => (

                <TaskCard
                  key={task._id}
                  task={task}
                  editingId={editingId}
                  editedTitle={editedTitle}
                  setEditedTitle={setEditedTitle}
                  setEditingId={setEditingId}
                  editTask={editTask}
                  toggleComplete={toggleComplete}
                  setSelectedTask={setSelectedTask}
                  setShowDeleteModal={setShowDeleteModal}
                />

              ))}

            </div>

          )}

        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">

          <hr className="mb-6 border-gray-300 dark:border-slate-700" />

          <p className="font-semibold">
            Made with ❤️ by Vansh Rastogi
          </p>

          <p className="mt-2">
            TaskFlow v1.0 • © 2026
          </p>

        </footer>

      </main>

      <DeleteModal
        isOpen={showDeleteModal}
        taskTitle={selectedTask?.title}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteTask(selectedTask._id);
          setShowDeleteModal(false);
        }}
      />

    </div>
  );
}

export default Dashboard;