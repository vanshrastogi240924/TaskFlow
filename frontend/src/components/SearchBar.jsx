function SearchBar({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-4">

      <input
        type="text"
        placeholder="🔍 Search your tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
      >
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="DSA">DSA</option>
        <option value="Web Development">Web Development</option>
        <option value="College">College</option>
        <option value="Personal">Personal</option>
      </select>

    </div>
  );
}

export default SearchBar;