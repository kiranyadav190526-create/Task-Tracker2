"use client";

import Link from "next/link";
import TaskStats from "./TaskStats";
import TaskList from "./TaskList";
import ConfirmDialog from "./ConfirmDialog";
import { useTasks } from "../utils/tasks";
import { useState } from "react";

export default function DashboardClient() {
  const { tasks, stats, ready, toggleTask, deleteTask } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState(null);

  const importantTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => priorityScore(b.priority) - priorityScore(a.priority))
    .slice(0, 4);

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Next.js Assignment Project</p>
          <h1>Plan the work. Finish the work.</h1>
          <p className="lead">
            A single-page classroom task tracker upgraded into a routed,
            production-style app with dynamic pages, CRUD operations, filters,
            and browser persistence.
          </p>

          <div className="hero-actions">
            <Link className="button primary" href="/tasks">
              Open Tasks
            </Link>
            <Link className="button" href="/about">
              About Project
            </Link>
          </div>
        </div>

        <aside className="panel">
          <h2>Today</h2>
          <TaskStats stats={stats} />
          <p className="muted" style={{ marginTop: 16 }}>
            {ready ? `${stats.progress}% of your tasks are complete.` : "Loading tasks..."}
          </p>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Focus Queue</p>
            <h2>Priority tasks</h2>
          </div>
          <Link className="button" href="/tasks">
            Manage all
          </Link>
        </div>

        <TaskList
          tasks={importantTasks}
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
