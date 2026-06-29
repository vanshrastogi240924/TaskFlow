/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "";
const LOCAL_TASKS_KEY = "taskflow_tasks";

const readLocalTasks = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_TASKS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveLocalTasks = (tasks) => {
  localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
};

const formatTask = (task) => ({
  ...task,
  deadline: task.deadline ? task.deadline.substring(0, 10) : "",
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token, user } = useContext(AuthContext);

  const isLocalSession = token?.startsWith("local:");
  const ownerId = user?._id || user?.email || "guest";

  const getLocalUserTasks = () =>
    readLocalTasks()
      .filter((task) => task.ownerId === ownerId)
      .map(formatTask)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const updateLocalTasks = (updater) => {
    const allTasks = readLocalTasks();
    const nextTasks = updater(allTasks);

    saveLocalTasks(nextTasks);
    setTasks(
      nextTasks
        .filter((task) => task.ownerId === ownerId)
        .map(formatTask)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    );
  };

  const createLocalTask = (taskData) => ({
    ...taskData,
    _id: crypto.randomUUID(),
    ownerId,
    createdAt: new Date().toISOString(),
  });

  const fetchTasks = async () => {
    if (!token) return;

    if (isLocalSession || !API_URL) {
      setTasks(getLocalUserTasks());
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.map(formatTask));
        return;
      }
    } catch {
      setTasks(getLocalUserTasks());
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [token, user]);

  const addTask = async (taskData) => {
    if (!token) return false;

    if (isLocalSession || !API_URL) {
      updateLocalTasks((allTasks) => [createLocalTask(taskData), ...allTasks]);
      return true;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [formatTask(newTask), ...prevTasks]);

        toast.success("🎉 Task created successfully!");

        return true;
      }
    } catch {
      updateLocalTasks((allTasks) => [createLocalTask(taskData), ...allTasks]);
      return true;
    }

    return false;
  };

  const deleteTask = async (id) => {
    if (!token) return false;

    if (isLocalSession || !API_URL) {
      updateLocalTasks((allTasks) => allTasks.filter((task) => task._id !== id));
      return true;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
    setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
    );

    toast.success("🗑 Task deleted successfully!");

    return true;
}
    } catch {
      updateLocalTasks((allTasks) => allTasks.filter((task) => task._id !== id));
      return true;
    }

    return false;
  };

  const editTask = async (id, updatedFields) => {
    if (!token) return false;

    if (isLocalSession || !API_URL) {
      updateLocalTasks((allTasks) =>
        allTasks.map((task) =>
          task._id === id ? { ...task, ...updatedFields } : task
        )
      );
      return true;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
    const updatedTask = await response.json();

    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task._id === id
                ? formatTask(updatedTask)
                : task
        )
    );

    toast.success("✏️ Task updated!");

    return true;
}
    } catch {
      updateLocalTasks((allTasks) =>
        allTasks.map((task) =>
          task._id === id ? { ...task, ...updatedFields } : task
        )
      );
      return true;
    }

    return false;
  };

  const toggleComplete = async (id) => {
  const task = tasks.find((currentTask) => currentTask._id === id);

  if (!task) return false;

  const success = await editTask(id, {
    completed: !task.completed,
  });

  if (success) {
    toast.success(
      task.completed
        ? "📌 Task marked as pending"
        : "✅ Task completed!"
    );
  }

  return success;
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        deleteTask,
        editTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
