"use client";

import { useState } from "react";
import { createTask } from "@/app/lib/actions";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default function CreateTaskForm({ listId }: { listId: string }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.set("listId", listId);
      formData.set("title", title);

      await createTask(formData);
      setTitle("");
      window.location.reload();
    } catch (err: any) {
      if (err?.message) {
        setError(err.message);
      } else {
        setError("Noe gikk galt");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Legg til ny oppgave..."
        className="input"
      />
      <button
        type="submit"
        className="my-button flex items-center"
      >
        <PlusIcon className="button-icon mr-2" />
        Legg til
      </button>
      <p className="counter">
        {title.length}/140 tegn
      </p>
    </form>
  );
}
