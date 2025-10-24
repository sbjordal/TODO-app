"use client";

import { deleteTask, toggleTaskCompleted } from "@/app/lib/actions";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  listName?: string; // 👈 valgfri liste-tittel
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

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const firstCompletedIndex = sortedTasks.findIndex(task => task.completed);

  return (
    <ul className="task-list">
      {sortedTasks.map((task, index) => (
        <div key={task.id}>
          {index === firstCompletedIndex && firstCompletedIndex !== -1 && (
            <hr className="task-separator" />
          )}

          <li className={task.completed ? "task-finished" : ""}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) =>
                  handleToggleCompleted(task.id, e.target.checked)
                }
              />
              <span className="task-title">{task.title}</span>
              {/* 👇 Vis listetittel bare hvis den finnes */}
              {task.listName && (
                <span className="ml-2 text-sm text-gray-600 italic">
                  ({task.listName})
                </span>
              )}
            </div>
            <button
              className="remove-button"
              onClick={() => handleDelete(task.id)}
              aria-label={`Slett ${task.title}`}
            >
              ×
            </button>
          </li>
        </div>
      ))}
    </ul>
  );
}
