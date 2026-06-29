import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CategoryBarChart({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center h-[350px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold dark:text-white">
          📊 No Analytics Yet
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          Create your first task to see insights.
        </p>
      </div>
    );
  }

  const categories = {};

  tasks.forEach((task) => {
    categories[task.category] =
      (categories[task.category] || 0) + 1;
  });

  const data = Object.keys(categories).map((key) => ({
    category: key,
    tasks: categories[key],
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Tasks by Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="tasks"
            fill="#06b6d4"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryBarChart;