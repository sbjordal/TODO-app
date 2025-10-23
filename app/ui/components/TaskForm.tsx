"use client";

import { useState } from "react";
import { createTask } from "@/app/lib/actions";

export default function TaskForm({ listId }: { listId: string }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("listId", listId);
    formData.set("title", title);

    await createTask(formData);
    setTitle("");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Legg til ny oppgave..."
        className="task-input"
      />
      <button
        type="submit"
        className="task-button"
      >
        Legg til
      </button>
    </form>
  );
}
