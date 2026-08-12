'use client';

import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Learn Next.js',
      description: 'Practice components and state',
      completed: false,
    },
    {
      id: 2,
      title: 'Build Task Tracker',
      description: 'Complete the assignment',
      completed: true,
    },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <main style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>TASK TRACKER</h1>
      <p style={{ textAlign: 'center' }}>
        Stay organised. Get things done.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 0',
          gap: '10px',
        }}
      >
        <div>Total: {tasks.length}</div>
        <div>Completed: {completed}</div>
        <div>Pending: {pending}</div>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '15px',
          }}
        >
          <h3
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </h3>

          <p>{task.description}</p>

          <p>
            Status:{' '}
            <strong>
              {task.completed ? 'Completed ✓' : 'Pending'}
            </strong>
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed
                ? 'Mark Pending'
                : 'Mark Completed'}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <h2>Add Task</h2>

        <input
          type='text'
          placeholder='Task title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
          }}
        />

        <textarea
          placeholder='Task description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
          }}
        />

        <button onClick={addTask}>+ Add Task</button>
      </div>
    </main>
  );
}