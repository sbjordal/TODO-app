"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/app/lib/actions";
import { PlusIcon } from "@heroicons/react/24/outline"; 

/**
 * Skjema for å opprette en ny oppgave i en liste.
 * Sender data til `createTask` og viser eventuell feilmelding fra serveren.
 */
export default function CreateTaskForm({ listId }: { listId: string } ) {
  const [title, setTitle] = useState(""); //brukerinput for tittel
  const [error, setError] = useState<string | null>(null); //for visualisering av feilmelding
  const router = useRouter(); // for oppdatering / navigering mellom sider

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("listId", listId);
    formData.set("title", title);
    const result = await createTask(formData); //sender formdata til actions.ts for validering

    if (!result.success) {
      setError(result.message ?? "Uventet feil. Prøv igjen senere.");
      return;
    }
    setTitle("");
    router.refresh(); // Oppdaterer listen for å vise ny oppgave
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
        <p className="info">{title.length}/140 tegn</p>
      </form>
      {error && <div className="info">{error}</div>}
    </div>
  );
}