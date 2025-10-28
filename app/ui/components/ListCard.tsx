"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateList, deleteList } from "@/app/lib/actions";
import AppButton from "./AppButton";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ErrorBanner from "./ErrorBanner";
import Link from "next/link";

type Props = {
  list: {
    id: string;
    name: string;
  };
};

/**
 * @component ListCard
 * 
 * Viser en enkelt liste med tittel og handlingsknapper for redigering og sletting.
 * 
 * Funksjonalitet:
 * - Viser listenavnet med lenke til detaljsiden
 * - Lar brukeren redigere navnet på listen 
 * - Lar brukeren slette listen
 * 
 * Props:
 * - `list` (object, required): Objekt med:
 *    - `id` (string): ID for listen.
 *    - `name` (string): Navnet på listen.
 * 
 * Handlinger:
 * - `updateList` kalles når brukeren lagrer endringer.
 * - `deleteList` kalles når brukeren sletter listen.
 */

export default function ListCard({ list }: Props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSave() {
    const result = await updateList(list.id, newName);
    if (!result.success) {
      setError(result.message ?? "Kunne ikke oppdatere tittelen.");
      return;
    }
    setEditing(false);
    setError(null);
  }

  async function handleDelete() {
    const result = await deleteList(list.id);
    if (!result.success) {
      setError(result.message ?? "Noe gikk galt ved sletting.");
    }
  }

  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!editing) {
      router.push(`/dashboard/${list.id}`);
    }
  }

  return (
    <div className="list-card flex flex-col justify-between"
    onClick={handleCardClick}
    role="link">

      {editing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input w-full mb-2"
          onKeyDown={(e) => e.key === "Enter" && handleSave()} //kan lagre endring med enter
        />
      ) : (
        <h2 className="list-card-title">{list.name}</h2>
      )}
      <div className="flex gap-2 mt-2 justify-end">
        {editing ? (
          <>
            <AppButton
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation(); //hindrer at man tas til listpage her
                handleSave();
              }}
              label=""
              icon={<CheckIcon className="icon" />}
            />
            <AppButton
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation(); //hindrer at man tas til listpage her
                setEditing(false);
                setNewName(list.name);
              }}
              label=""
              icon={<XMarkIcon className="icon" />}
            />
          </>
        ) : (
          <AppButton
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation(); //hindrer at man tas til listpage her
              setEditing(true)
            }}
            label=""
            icon={<PencilIcon className="icon" />}
          />
        )}
        <AppButton
          className="icon-button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          label=""
          icon={<TrashIcon className="icon" />}
        />
      </div>

      {error && <ErrorBanner message={error} />}
    </div>
  );
}
