'use client';

import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title, description);

    setTitle('');
    setDescription('');
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        type='text'
        placeholder='Task title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder='Task description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type='submit'>+ Add Task</button>
    </form>
  );
}