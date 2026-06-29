import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

function StatsCards({
  totalTasks,
  completedTasks,
  pendingTasks,
  completionRate,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      bg: "bg-blue-50 dark:bg-slate-800",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-slate-900 dark:text-white",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      bg: "bg-green-50 dark:bg-slate-800",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock3,
      bg: "bg-orange-50 dark:bg-slate-800",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      valueColor: "text-orange-500 dark:text-orange-400",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      bg: "bg-purple-50 dark:bg-slate-800",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-600 dark:text-purple-400",
      progress: completionRate,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.bg} rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  {card.title}
                </p>

                <h2 className={`text-5xl font-bold mt-3 ${card.valueColor}`}>
                  {card.value}
                </h2>
              </div>

              <div className={`${card.iconBg} p-4 rounded-full`}>
                <Icon className={card.iconColor} size={36} />
              </div>
            </div>

            {card.progress !== undefined && (
              <div className="w-full h-3 bg-gray-200 rounded-full mt-6">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;