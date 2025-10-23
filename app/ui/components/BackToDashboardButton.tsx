// CreateListButton.tsx
'use client';

import { useRouter } from "next/navigation";

export default function BackToDashboardButton() {
  const router = useRouter();

  return (
    <div className="create-list-container">
      <button
        onClick={() => router.push("/dashboard")}
        className="small-button"
      >
        Tilbake til mine lister
      </button>
    </div>
  );
}
