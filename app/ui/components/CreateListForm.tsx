'use client';

import { useState } from "react";
import { createList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import ErrorBanner from "./ErrorBanner";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default function CreateListForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("name", name);

    try {
      const result = await createList(formData);

      if (!result.success) {
        if (result.status === 422) setError(result.message);
        else setError("Uventet feil. Prøv igjen senere.");
        return;
      }

      setName("");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="my-button flex items-center"
        >
          <PlusIcon className="button-icon" />
          Legg til
        </button>
      </form>
      {error && <ErrorBanner message={error} />}
    </div>
  );
}
