function ProductivityInsights({
  currentStreak,
  completedTasks,
  completionRate,
  topCategory,
  upcomingDeadlines,
}) {
  return (
    <div className="mt-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">

      <h2 className="text-3xl font-bold mb-8">
        📊 Productivity Insights
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

        <div>
          <p className="text-orange-100 text-sm">
            🔥 Current Streak
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {currentStreak}
          </h3>

          <p className="text-orange-100">
            Day{currentStreak !== 1 ? "s" : ""}
          </p>
        </div>

        <div>
          <p className="text-orange-100 text-sm">
            ✅ Completed
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {completedTasks}
          </h3>

          <p className="text-orange-100">
            Tasks
          </p>
        </div>

        <div>
          <p className="text-orange-100 text-sm">
            📈 Completion
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {completionRate}%
          </h3>

          <p className="text-orange-100">
            Success
          </p>
        </div>

        <div>
          <p className="text-orange-100 text-sm">
            🏆 Top Category
          </p>

          <h3 className="text-2xl font-bold mt-3 break-words">
            {topCategory}
          </h3>
        </div>

        <div>
          <p className="text-orange-100 text-sm">
            ⏰ Upcoming
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {upcomingDeadlines}
          </h3>

          <p className="text-orange-100">
            Deadlines
          </p>
        </div>

      </div>

      <div className="mt-8 border-t border-white/20 pt-5">

        <p className="text-orange-100">
          💪 Keep completing your tasks consistently to improve your productivity!
        </p>

      </div>

    </div>
  );
}

export default ProductivityInsights;