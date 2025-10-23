// CreateListButton.tsx
'use client';

import { useRouter } from "next/navigation";

export default function CreateListButton() {
  const router = useRouter();

  return (
    <div className="create-list-container">
      <button
        onClick={() => router.push("/dashboard/create")}
        className="create-list-button"
      >
        Lag ny liste
      </button>
    </div>
  );
}
