'use client';

import { useState } from "react";
import { createList } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default function CreateListForm({ userId }: { userId: string }) {
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

      setName("");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  }

  return (
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
        className="my-button flex items-center">
        <PlusIcon className="button-icon" />
        {loading ? "Lagrer..." : "Lag liste"}
      </button>
    </form>
  );
}
