"use client";

import { useMemo, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import TaskFilters from "./TaskFilters";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import { useTasks } from "../utils/tasks";

export default function TasksPageClient() {
  const { tasks, stats, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [taskToDelete, setTaskToDelete] = useState(null);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      })
      .filter((task) => {
        if (!query) return true;
        return [task.title, task.description, task.category]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === "priority") {
          return priorityScore(b.priority) - priorityScore(a.priority);
        }

        if (sort === "due") {
          return dueScore(a.dueDate) - dueScore(b.dueDate);
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [filter, search, sort, tasks]);

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <main className="app-shell">
      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Task Board</p>
            <h1>All tasks</h1>
            <p className="lead">
              Create, update, filter, complete, and delete tasks. Every change is
              saved in your browser.
            </p>
          </div>
        </div>

        <div className="panel" style={{ marginBottom: 18 }}>
          <TaskStats stats={stats} />
        </div>

        <TaskForm onSubmit={addTask} submitLabel="+ Add Task" />

        <div className="toolbar" style={{ marginTop: 18 }}>
          <input
            className="input search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, description, or category"
          />

          <TaskFilters filter={filter} setFilter={setFilter} />

          <select
            className="select"
            style={{ width: "auto" }}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort tasks"
          >
            <option value="newest">Newest</option>
            <option value="priority">Priority</option>
            <option value="due">Due date</option>
          </select>
        </div>

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={setTaskToDelete}
        />
      </section>

      <ConfirmDialog
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}

function priorityScore(priority) {
  return { High: 3, Medium: 2, Low: 1 }[priority] || 0;
}

function dueScore(dueDate) {
  return dueDate ? new Date(`${dueDate}T00:00:00`).getTime() : Number.MAX_SAFE_INTEGER;
}
