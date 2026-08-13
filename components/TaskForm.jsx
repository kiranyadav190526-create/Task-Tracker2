"use client";

import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  category: "General",
  dueDate: "",
  completed: false,
};

export default function TaskForm({ initialTask, onSubmit, submitLabel = "Add Task" }) {
  const [form, setForm] = useState(() =>
    initialTask ? { ...emptyForm, ...initialTask } : emptyForm,
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    onSubmit(form);

    if (!initialTask) {
      setForm(emptyForm);
    }
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <h2>{initialTask ? "Edit task" : "Add task"}</h2>

      <div className="form-grid">
        <div className="field full">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            className="input"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Complete Next.js assignment"
            required
          />
        </div>

        <div className="field full">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            className="textarea"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Add the details someone would need to understand this task."
          />
        </div>

        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="select"
            value={form.priority}
            onChange={(event) => updateField("priority", event.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="task-category">Category</label>
          <input
            id="task-category"
            className="input"
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="Assignment"
          />
        </div>

        <div className="field">
          <label htmlFor="task-due">Due date</label>
          <input
            id="task-due"
            className="input"
            type="date"
            value={form.dueDate}
            onChange={(event) => updateField("dueDate", event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="select"
            value={form.completed ? "completed" : "pending"}
            onChange={(event) =>
              updateField("completed", event.target.value === "completed")
            }
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-actions" style={{ marginTop: 16 }}>
        <button className="button primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
