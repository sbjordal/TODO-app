"use client";

import { deleteTask } from '@/app/lib/actions'

type Task = {
  id: string;
  title: string;
};

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {

  async function handleDelete(taskId: string) {
    try {
      await deleteTask(taskId);
      window.location.reload();
    } catch (err) {
      console.error("Kunne ikke slette task:", err)
    }
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <input type="checkbox" />
            {task.title}
          </div>
          <button className="remove-button"
          onClick= {() => handleDelete(task.id)}
          >×</button>
        </li>
      ))}
    </ul>
  );
}
