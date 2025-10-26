"use client";

import AppButton from "@/app/ui/components/AppButton";
import { useEffect } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Feil fanget i error.tsx:", error);
  }, [error]);

  return (
    <div className="page-container text-center">
      <h1 className="page-title text-red-600">Noe gikk galt</h1>
      <p className="page-subtitle">{error.message}</p>
      <button
        onClick={() => reset()}
        className="my-button"
      >
        Prøv igjen
      </button>
      <div className="center-container">
      <AppButton 
        path="/dashboard"
        label="Tilbake"
        icon={<HomeIcon className="button-icon" />}
        className="my-button"
      />
      </div>

    </div>
  );
}
