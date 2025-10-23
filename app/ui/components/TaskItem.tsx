'use client';

import { useState } from 'react';
import { toggleTaskCompleted } from '@/app/lib/actions';

type Props = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskItem({ id, title, completed }: Props) {
  const [isCompleted, setIsCompleted] = useState(completed);

  async function handleToggle() {
    setIsCompleted(!isCompleted);
    await toggleTaskCompleted(id, !isCompleted);
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded shadow hover:bg-gray-50">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        className="w-5 h-5"
      />
      <span className={isCompleted ? 'line-through text-gray-400' : ''}>
        {title}
      </span>
    </div>
  );
}
