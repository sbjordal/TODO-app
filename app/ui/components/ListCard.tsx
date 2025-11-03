"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateList, deleteList } from "@/app/lib/actions";
import AppButton from "./AppButton";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

/**
 * Viser en liste med navn og knapper for redigering og sletting.
 * 
 * Funksjonalitet:
 * - Klikk på kortet åpner listen (til `/dashboard/[listId]`).
 * - Brukeren kan redigere navnet og lagre eller avbryte.
 * - Brukeren kan slette listen.
 * 
 * Feilmeldinger vises direkte under kortet.
 */

export default function ListCard({ list }: { list: { id: string; name: string } }) {
  const [editing, setEditing] = useState(false); //om bruker redigerer listenavnet
  const [newName, setNewName] = useState(list.name); //nytt navn
  const [error, setError] = useState<string | null>(null); //visualisere feilmelding
  const router = useRouter(); //for oppdatering og navigering

  // Lagrer nytt navn på listen
  async function handleSave() {
    setError(null);
    const result = await updateList(list.id, newName);

    if (!result.success) {
      setError(result.message ?? "Kunne ikke oppdatere tittelen.");
      return;
    }
    setEditing(false);
    router.refresh(); //oppdaterer visningen
  }

  // Sletter listen
  async function handleDelete() {
    setError(null)
    const result = await deleteList(list.id);
    if (!result.success) {
      setError(result.message ?? "Noe gikk galt ved sletting.");
      return;
    }
    router.refresh(); //Oppdaterer
  }

  // Åpner listen hvis man ikke er i redigeringsmodus
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
            e.stopPropagation(); //hindrer at man tas til listpage her
            handleDelete();
          }}
          label=""
          icon={<TrashIcon className="icon" />}
        />
      </div>
      {error && <div className="info">{error}</div>}
    </div>
  );
}
