'use client';

import { useState } from "react";
import { createList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline"; 

/**
 * Skjema for å opprette en ny liste.
 * Sender data til `createList` og viser feilmelding fra serveren ved behov.
 */

export default function CreateListForm({ userId }: { userId: string }) {
  const [name, setName] = useState(""); //brukerinput for tittel
  const [error, setError] = useState<string | null>(null); //for visualisering av feilmelding
  const router = useRouter(); // for oppdatering / navigering mellom sider

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("name", name);
    const result = await createList(formData);

    if (!result.success) {
      setError(result.message ?? "Noe gikk galt");
      return;
    }
    setName("");
    router.refresh();
  }

  return (
    <div className="center-container flex flex-col items-center gap-2">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Navn på ny liste..."
          className="input"
        />
        <button
          type="submit"
          className="my-button flex items-center"
        >
          <PlusIcon className="button-icon" />
          Legg til
        </button>
        <p className="info">{name.length}/140 tegn</p> 
      </form>
      {error && <div className="info">{error}</div>}
    </div>
  );
}