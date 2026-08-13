export default function TaskStats({ stats }) {
  return (
    <div>
      <div className="stats-grid" aria-label="Task statistics">
        <div className="stat">
          <strong>{stats.total}</strong>
          <span>Total tasks</span>
        </div>
        <div className="stat">
          <strong>{stats.completed}</strong>
          <span>Completed</span>
        </div>
        <div className="stat">
          <strong>{stats.pending}</strong>
          <span>Pending</span>
        </div>
      </div>

      <div className="progress" aria-label={`${stats.progress}% complete`}>
        <span style={{ width: `${stats.progress}%` }} />
      </div>
    </div>
  );
}
