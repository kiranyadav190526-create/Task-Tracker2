import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <h2>No tasks found</h2>
        <p className="muted">
          Try changing the filter or add a fresh task to get moving.
        </p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
