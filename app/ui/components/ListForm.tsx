'use client';

import { useState } from "react";
import { createList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function ListForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("name", name);

      await createList(formData);

      // Nullstill input
      setName("");

      // Gå tilbake til dashboard etter opprettelse
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Navn på ny liste..."
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        {loading ? "Lagrer..." : "Lag liste"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
