"use client";

import { deleteTask, toggleTaskCompleted } from "@/app/lib/actions";

type Task = {
  id: string;
  title: string;
  completed: boolean;
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
      console.error("Kunne ikke slette task:", err);
    }
  }

  async function handleToggle(taskId: string, checked: boolean) {
    try {
      await toggleTaskCompleted(taskId, checked);
      window.location.reload();
    } catch (err) {
      console.error("Kunne ikke oppdatere task:", err);
    }
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleToggle(task.id, e.target.checked)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#777" : "inherit",
              }}
            >
              {task.title}
            </span>
          </div>
          <button
            className="remove-button"
            onClick={() => handleDelete(task.id)}
            aria-label={`Slett ${task.title}`}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
