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

  async function handleToggleCompleted(taskId: string, completed: boolean) {
    try {
      await toggleTaskCompleted(taskId, completed);
      window.location.reload();
    } catch (err) {
      console.error("Kunne ikke oppdatere task:", err);
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => { // fullførte tasks flyttes nederst i listen
    if (a.completed === b.completed) return 0; // 0: Uendret rekkefølge
    return a.completed ? 1 : -1; //negativt tall: a kommer før b, positivt: b før a
  });

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <li key={task.id}>
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                handleToggleCompleted(task.id, e.target.checked)
              }
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
