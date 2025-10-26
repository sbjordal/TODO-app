"use client";

import AppButton from "@/app/ui/components/AppButton";
import { useEffect, useMemo } from "react";
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

  // Parse meldingen hvis den er JSON
  const parsedError = useMemo(() => {
    try {
      return JSON.parse(error.message);
    } catch {
      return null;
    }
  }, [error.message]);

  const displayMessage = parsedError?.message ?? error.message;

  return (
    <div className="page-container text-center">
      <h1 className="page-title">Noe gikk galt</h1>
      {parsedError?.status && (
        <p className="page-subtitle">Status: {parsedError.status}</p>
      )}
      <p className="page-subtitle">{displayMessage}</p>
      <button
        onClick={() => reset()}
        className="my-button">Prøv igjen</button>
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
