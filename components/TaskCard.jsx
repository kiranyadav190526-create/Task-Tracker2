"use client";

import Link from "next/link";
import { formatDate, isOverdue } from "../utils/tasks";

export default function TaskCard({ task, onToggle, onDelete }) {
  const overdue = isOverdue(task);

  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="card-top">
        <div>
          <h3>{task.title}</h3>
          <p className="task-description">{task.description || "No description added."}</p>
        </div>
        <button
          className="icon-button"
          type="button"
          title={task.completed ? "Mark pending" : "Mark completed"}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark pending" : "Mark completed"}
        >
          {task.completed ? "Undo" : "Done"}
        </button>
      </div>

      <div className="pill-row">
        <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
        <span className={`pill ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
        {overdue ? <span className="pill overdue">Overdue</span> : null}
        <span className="pill">{task.category}</span>
      </div>

      <p className="muted">Due: {formatDate(task.dueDate)}</p>

      <div className="task-actions">
        <Link className="button" href={`/tasks/${task.id}`}>
          View
        </Link>
        <Link className="button" href={`/tasks/${task.id}?edit=1`}>
          Edit
        </Link>
        <button className="button danger" type="button" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </article>
  );
}
