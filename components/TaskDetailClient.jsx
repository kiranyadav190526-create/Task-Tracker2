"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import TaskForm from "./TaskForm";
import { formatDate, isOverdue, useTasks } from "../utils/tasks";

export default function TaskDetailClient({ id }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editing = searchParams.get("edit") === "1";
  const { tasks, updateTask, toggleTask, deleteTask, ready } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState(null);
  const task = tasks.find((item) => item.id === id);

  if (!ready) {
    return (
      <main className="app-shell section">
        <div className="empty-state">
          <h2>Loading task...</h2>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="app-shell section">
        <div className="empty-state">
          <h2>Task not found</h2>
          <p className="muted">This task may have been deleted.</p>
          <Link className="button primary" href="/tasks">
            Back to tasks
          </Link>
        </div>
      </main>
    );
  }

  const handleUpdate = (updates) => {
    updateTask(task.id, updates);
    router.push(`/tasks/${task.id}`);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setTaskToDelete(null);
    router.push("/tasks");
  };

  return (
    <main className="app-shell detail-layout">
      <section className="panel detail-card">
        <p className="eyebrow">Task Details</p>
        <h1 className="detail-title">{task.title}</h1>
        <p className="lead">{task.description || "No description added."}</p>

        <div className="pill-row" style={{ margin: "24px 0" }}>
          <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span className={`pill ${task.completed ? "completed" : "pending"}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
          {isOverdue(task) ? <span className="pill overdue">Overdue</span> : null}
          <span className="pill">{task.category}</span>
        </div>

        <div className="detail-actions">
          <button className="button primary" type="button" onClick={() => toggleTask(task.id)}>
            {task.completed ? "Mark Pending" : "Mark Completed"}
          </button>
          <Link className="button" href={`/tasks/${task.id}?edit=1`}>
            Edit
          </Link>
          <button className="button danger" type="button" onClick={() => setTaskToDelete(task)}>
            Delete
          </button>
          <Link className="button subtle" href="/tasks">
            Back
          </Link>
        </div>
      </section>

      <aside>
        {editing ? (
          <TaskForm initialTask={task} onSubmit={handleUpdate} submitLabel="Save Changes" />
        ) : (
          <section className="panel">
            <h2>Information</h2>
            <div className="meta-list">
              <div className="meta-row">
                <span>Status</span>
                {task.completed ? "Completed" : "Pending"}
              </div>
              <div className="meta-row">
                <span>Priority</span>
                {task.priority}
              </div>
              <div className="meta-row">
                <span>Category</span>
                {task.category}
              </div>
              <div className="meta-row">
                <span>Due date</span>
                {formatDate(task.dueDate)}
              </div>
              <div className="meta-row">
                <span>Created</span>
                {formatDate(task.createdAt)}
              </div>
            </div>
          </section>
        )}
      </aside>

      <ConfirmDialog
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
