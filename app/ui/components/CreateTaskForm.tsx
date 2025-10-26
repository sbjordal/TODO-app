"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/app/lib/actions";
import ErrorBanner from "./ErrorBanner";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default function CreateTaskForm({ listId }: { listId: string } ) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("listId", listId);
    formData.set("title", title);

    const result = await createTask(formData);
    if (!result.success) {
      if (result.status === 422) setError(result.message);
      else setError("Uventet feil. Prøv igjen senere.");
      return;
    }
    setTitle("");
    router.refresh(); // Vet ikke om dette er beste måten å løse det
  }

  return (
    <div className="center-container flex flex-col items-center gap-2">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Legg til ny oppgave..."
          className="input"
        />
        <button type="submit" className="my-button flex items-center">
          <PlusIcon className="button-icon mr-2" />
          Legg til
        </button>
        <p className="counter">{title.length}/140 tegn</p>
      </form>
      {error && <ErrorBanner message={error} />}
    </div>
    
  );
}
