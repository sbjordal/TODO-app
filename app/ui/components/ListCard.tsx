"use client";

import { useState } from "react";
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

export default function ListCard({ list }: Props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="list-card flex flex-col justify-between">

      {editing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input w-full mb-2"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <Link href={`/dashboard/${list.id}`} className= "no-underline">
          <h2 className="list-card-title">{list.name}</h2>
        </Link>
      )}

      <div className="flex gap-2 mt-2 justify-end">
        {editing ? (
          <>
            <AppButton
              className="icon-button"
              onClick={handleSave}
              label=""
              icon={<CheckIcon className="icon" />}
            />
            <AppButton
              className="icon-button"
              onClick={() => {
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
            onClick={() => setEditing(true)}
            label=""
            icon={<PencilIcon className="icon" />}
          />
        )}
        <AppButton
          className="icon-button"
          onClick={handleDelete}
          label=""
          icon={<TrashIcon className="icon" />}
        />
      </div>

      {error && <ErrorBanner message={error} />}
    </div>
  );
}
