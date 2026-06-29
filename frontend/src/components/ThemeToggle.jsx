import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition dark:bg-slate-700 dark:hover:bg-slate-600"
      title="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={22} />
      ) : (
        <Sun size={22} className="text-yellow-400" />
      )}
    </button>
  );
}

export default ThemeToggle;