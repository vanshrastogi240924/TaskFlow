import { Link } from "react-router-dom";

function TaskCard({
  task,
  editingId,
  editedTitle,
  setEditedTitle,
  setEditingId,
  editTask,
  toggleComplete,
  setSelectedTask,
  setShowDeleteModal,
}) {
  const isOverdue =
    !task.completed &&
    task.deadline &&
    new Date(task.deadline) < new Date();

  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        border-l-4
        ${
          task.priority === "High"
            ? "border-red-500"
            : task.priority === "Medium"
            ? "border-yellow-500"
            : "border-green-500"
        }
      `}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        {/* Left */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-3 items-center">

            {editingId === task._id ? (
              <input
                value={editedTitle}
                onChange={(e) =>
                  setEditedTitle(e.target.value)
                }
                className="border rounded-lg p-2 flex-1 dark:bg-slate-700 dark:text-white"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {task.title}
              </h2>
            )}

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.priority}
            </span>

            <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold">
              {task.category}
            </span>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            📅 Deadline:
            <span
              className={`ml-2 ${
                isOverdue ? "text-red-600 font-bold" : ""
              }`}
            >
              {task.deadline || "No deadline"}
            </span>
          </p>

          <p className="mt-2">
            {task.completed ? (
              <span className="text-green-600 font-semibold">
                ✅ Completed
              </span>
            ) : (
              <span className="text-orange-500 font-semibold">
                ⏳ Pending
              </span>
            )}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 items-center">

          <button
            onClick={() => toggleComplete(task._id)}
            className={`px-4 py-2 rounded-xl text-white ${
              task.completed
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          {editingId === task._id ? (
            <button
              onClick={() => {
                editTask(task._id, {
                  title: editedTitle,
                });

                setEditingId(null);
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingId(task._id);
                setEditedTitle(task.title);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              setSelectedTask(task);
              setShowDeleteModal(true);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Delete
          </button>

          <Link
            to="/task-details"
            state={{ task }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            View
          </Link>

        </div>
      </div>
    </div>
  );
}

export default TaskCard;