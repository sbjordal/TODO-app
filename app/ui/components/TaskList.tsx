"use client";

import { useState } from "react";
import { deleteTask, toggleTaskCompleted, updateTask } from "@/app/lib/actions";
import { Task } from "@/app/lib/definitions"
import TaskItem from "./TaskItem";

type TaskWithListName = Task &{ listName?: string; };
type Props = { tasks: TaskWithListName[];};

export default function TaskList({ tasks }: Props) {
  const [taskList, setTaskList] = useState<TaskWithListName[]>(tasks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Handlers
  async function handleDelete(id: string) {
    try {
      await deleteTask(id);
      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Kunne ikke slette task:", err);
    }
  }

  async function handleToggleCompleted(id: string, completed: boolean) {
    try {
      await toggleTaskCompleted(id, completed);
      setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
    } catch (err) {
      console.error("Kunne ikke oppdatere task:", err);
    }
  }

  async function handleSaveEdit(id: string) {
    if (!editTitle.trim()) return;
    try {
      await updateTask(id, editTitle);
      setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editTitle } : task
      )
    );
      setEditingId(null);
      setEditTitle("");
      
    } catch (err) {
      console.error("Kunne ikke oppdatere tittel:", err);
    }
  }

  //Sortering og rendering
  const sortedTasks = [...taskList].sort((a, b) => {
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
  );
}
