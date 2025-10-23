'use client';

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // Legge til login / adduser-funksjonalitet
  return (
    <main className="page-container">
      <div className="page-title">
        <h1 className="landing-title">TODO</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="my-button"
        >
          Vis mine lister
        </button>
      </div>
    </main>
  );
}
