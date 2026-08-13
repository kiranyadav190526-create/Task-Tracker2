export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className='task-card'>
      <h3 className={task.completed ? 'completed' : ''}>
        {task.title}
      </h3>

      <p>{task.description}</p>

      <p>
        Status:{' '}
        <strong>
          {task.completed ? 'Completed ✓' : 'Pending'}
        </strong>
      </p>

      <p>Priority: {task.priority}</p>

      <div className='actions'>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </button>

        <button
          className='delete-btn'
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}