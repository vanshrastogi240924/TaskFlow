import { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

function Calendar() {
  const { tasks } = useContext(TaskContext);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Calendar View 📅</h1>
          <Link
            to="/dashboard"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-xl shadow">
              <p className="text-gray-500">No tasks with deadlines yet.</p>
            </div>
          ) : (
            sortedTasks.map((task) => {
              const isOverdue =
                !task.completed && new Date(task.deadline) < new Date();
              return (
                <div
                  key={task._id}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:shadow-md"
                >
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">{task.title}</h2>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {task.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right shrink-0">
                    <p className={`font-semibold text-sm ${isOverdue ? "text-red-600 font-bold" : "text-blue-600"}`}>
                      Deadline: {task.deadline}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Status:{" "}
                      {task.completed ? (
                        <span className="text-green-600 font-semibold">✅ Completed</span>
                      ) : (
                        <span className="text-orange-500 font-semibold">⏳ Pending</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;