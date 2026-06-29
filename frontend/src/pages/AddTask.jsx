import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import toast from "react-hot-toast";


function AddTask() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Placement");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !deadline) return;

    setLoading(true);
    const success = await addTask({
      title,
      description,
      priority,
      category,
      deadline,
      completed: false,
    });
    setLoading(false);

    if (success) {
  toast.success("Task created successfully!");
  navigate("/dashboard");
} else {
  toast.error("Failed to create task");
}
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Task</h1>
          <Link
            to="/dashboard"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Placement</option>
                <option>DSA</option>
                <option>Web Development</option>
                <option>College</option>
                <option>Personal</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows="4"
              placeholder="Enter task description (optional)"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;