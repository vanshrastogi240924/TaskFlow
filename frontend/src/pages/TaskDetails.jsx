import { useLocation, Link } from "react-router-dom";

function TaskDetails() {
  const location = useLocation();
  const task = location.state?.task;

  if (!task) {
    return (
      <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-2">No Task Selected</h2>
          <p className="text-gray-500 mb-6">
            Please choose a task from your dashboard to view its details.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-100">
        <div className="flex justify-between items-start mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 break-words flex-1">
            {task.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              task.priority === "High"
                ? "bg-red-100 text-red-700"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.priority} Priority
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg border border-gray-100 min-h-[80px]">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-500">Category</h3>
              <p className="mt-1 text-gray-800 font-semibold">{task.category}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500">Deadline</h3>
              <p className="mt-1 text-blue-600 font-semibold">📅 {task.deadline}</p>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1">
              {task.completed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✅ Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  ⏳ Pending
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/dashboard"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;