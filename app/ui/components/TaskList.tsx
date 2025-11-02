"use client";

import { useEffect, useState } from "react";
import { deleteTask, toggleTaskCompleted, updateTask } from "@/app/lib/actions";
import { Task } from "@/app/lib/definitions"
import TaskItem from "./TaskItem";

type TaskWithListName = Task &{ listName?: string; };
type Props = { tasks: TaskWithListName[];};

/**
 * Viser og håndterer en liste av oppgaver.
 * 
 * - Lar brukeren fullføre, redigere og slette oppgaver
 * - Viser feilmeldinger ved feil fra server/actions
 * - Sorterer aktive oppgaver først, så fullførte
 */

export default function TaskList({ tasks }: Props) {
  const [taskList, setTaskList] = useState<TaskWithListName[]>(tasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);
  
  // Handlers
  async function handleDelete(id: string) {
    setError(null)
    const result = await deleteTask(id);
    setTaskList((prev) => prev.filter((task) => task.id !== id));
    
    if (!result.success) {
      setError(result.message ?? "Noe gikk galt ved sletting.");
      return;
    }
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  }

  async function handleToggleCompleted(id: string, completed: boolean) {
    setError(null);
    const result = await toggleTaskCompleted(id, completed);

    if (!result.success) {
      setError(result.message ?? "Kunne ikke oppdatere oppgaven.");
      return;
    }
    setTaskList((prev) =>prev.map((task) =>
      task.id === id ? { ...task, completed } : task
    )
  );
  }

  async function handleSaveEdit(id: string) {
    setError(null);
    if (!editTitle.trim()) return;
    const result = await updateTask(id, editTitle);

    if (!result.success) {
      setError(result.message ?? "Kunne ikke oppdatere tittelen.");
      return;
    }

    setTaskList((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, title: editTitle } : task
    )
  );
    setEditingId(null);
    setEditTitle("");

  }

  //Sortering og rendering
  const sortedTasks = [...taskList].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const firstCompletedIndex = sortedTasks.findIndex((task) => task.completed);

  return (
    <>
      {error && <div className="info">{error}</div>}

      <ul className="task-list">
        {sortedTasks.map((task, index) => (
          <div key={task.id}>
            {index === firstCompletedIndex && firstCompletedIndex !== -1 && (
              <hr className="task-separator" />
            )}
            <TaskItem
              task={task}
              isEditing={editingId === task.id}
              editTitle={editTitle}
              onToggle={handleToggleCompleted}
              onChangeEdit={setEditTitle}
              onSaveEdit={handleSaveEdit}
              onEditStart={(id, title) => {
                setEditingId(id);
                setEditTitle(title);
              }}
              onEditCancel={() => {
                setEditingId(null);
                setEditTitle("");
              }}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </ul>
    </>
  );
}