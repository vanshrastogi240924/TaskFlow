import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b"];

function AnalyticsPieChart({ tasks }) {
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

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Task Status
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsPieChart;