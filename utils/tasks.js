"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "task-tracker.tasks.v2";

export const defaultTasks = [
  {
    id: "next-components",
    title: "Learn Next.js Components",
    description: "Practice reusable components, props, state, and event handling.",
    priority: "High",
    category: "Learning",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "routing-assignment",
    title: "Complete Dynamic Routing",
    description: "Build individual task pages with /tasks/[id] and link every task card.",
    priority: "High",
    category: "Assignment",
    dueDate: new Date(Date.now() + 172800000).toISOString().slice(0, 10),
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "open-source",
    title: "Explore Open Source Repositories",
    description: "Find three repositories related to your domain and note what makes them useful.",
    priority: "Medium",
    category: "Research",
    dueDate: "",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

function loadTasks() {
  if (typeof window === "undefined") {
    return defaultTasks;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

function saveTasks(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const ready = true;

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveTasks(tasks);
    }
  }, [tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;
    const overdue = tasks.filter((task) => isOverdue(task)).length;
    const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    return { total: tasks.length, completed, pending, overdue, progress };
  }, [tasks]);

  const addTask = (task) => {
    const nextTask = {
      id: createTaskId(),
      title: task.title.trim(),
      description: task.description.trim(),
      priority: task.priority || "Medium",
      category: task.category?.trim() || "General",
      dueDate: task.dueDate || "",
      completed: Boolean(task.completed),
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [nextTask, ...current]);
    return nextTask;
  };

  const updateTask = (id, updates) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              title: updates.title?.trim() ?? task.title,
              description: updates.description?.trim() ?? task.description,
              category: updates.category?.trim() || task.category,
            }
          : task,
      ),
    );
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return { tasks, stats, ready, addTask, updateTask, toggleTask, deleteTask };
}

export function isOverdue(task) {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${task.dueDate}T00:00:00`);

  return due < today;
}

export function formatDate(value) {
  if (!value) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
