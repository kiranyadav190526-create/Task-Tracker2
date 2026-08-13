"use client";

export default function ConfirmDialog({ task, onCancel, onConfirm }) {
  if (!task) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation">
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <h2 id="dialog-title">Delete task?</h2>
        <p className="muted">
          Are you sure you want to delete <strong>{task.title}</strong>? This
          action cannot be undone.
        </p>

        <div className="form-actions" style={{ marginTop: 18 }}>
          <button className="button subtle" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="button danger" type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
