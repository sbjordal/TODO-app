'use client';

import { useState } from 'react';
import { createTask } from '@/app/lib/actions';

export default function TaskForm({ listId }: { listId: string }) {
  const [title, setTitle] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set('listId', listId);
    formData.set('title', title);

    await createTask(formData);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input type="hidden" name="listId" value={listId} />
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Legg til ny oppgave..."
            className="flex-1 p-2 border rounded"
        />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Legg til
      </button>
    </form>
  );
}