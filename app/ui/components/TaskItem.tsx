"use client";

import { Task } from "@/app/lib/definitions"
import { CheckIcon, XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import AppButton from "@/app/ui/components/AppButton";

type TaskWithListName = Task & { listName?: string};

type Props = {
    task: TaskWithListName;
    isEditing: boolean;
    editTitle: string;
    onToggle: (id: string, completed: boolean) => void;
    onChangeEdit: (title: string) => void;
    onSaveEdit: (id: string) => void;
    onEditStart: (id: string, title: string) => void;
    onEditCancel: () => void;
    onDelete: (id: string) => void;
};

/**
 * @component TaskItem
 *
 * Viser én enkelt oppgave med funksjonalitet for å:
 * - Markere som fullført / ikke fullført
 * - Redigere tittel
 * - Avbryte redigering
 * - Slette oppgaven
 *
 * Brukes i oppgavelister for å vise og håndtere individuelle oppgaver.
 *
 * Props:
 * - `task` (TaskWithListName, required): Oppgaveobjekt med tittel, status og ev. tilhørende listenavn.
 * - `isEditing` (boolean): Angir om oppgaven er i redigeringsmodus.
 * - `editTitle` (string): Midlertidig verdi under redigering.
 * - `onToggle` (function): Kalles når brukeren markerer oppgaven som fullført eller ikke.
 * - `onChangeEdit` (function): Oppdaterer `editTitle` når brukeren skriver.
 * - `onSaveEdit` (function): Kalles ved lagring av ny tittel.
 * - `onEditStart` (function): Aktiverer redigeringsmodus.
 * - `onEditCancel` (function): Avbryter redigering uten endringer.
 * - `onDelete` (function): Sletter oppgaven.
 */

export default function TaskItem({
  task,
  isEditing,
  editTitle,
  onToggle,
  onChangeEdit,
  onSaveEdit,
  onEditStart,
  onEditCancel,
  onDelete,
}: Props) {
    return (
    <li className={task.completed ? "task-finished" : ""}>
      {/* Venstre side */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onChangeEdit(e.target.value)}
            className="input w-[200px]"
            onKeyDown={(e) => e.key === "Enter" && onSaveEdit(task.id)}
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}

        {task.listName && (
          <span className="ml-2 text-sm text-gray-600 italic">
            ({task.listName})
          </span>
        )}
      </div>

      {/* Høyre side (actions) */}
      <div className="flex gap-1">
        {isEditing ? (
          <>
            <AppButton
              className="icon-button"
              onClick={() => onSaveEdit(task.id)}
              label=""
              icon={<CheckIcon className="icon" />}
            />
            <AppButton
              className="icon-button"
              onClick={onEditCancel}
              label=""
              icon={<XMarkIcon className="icon" />}
            />
          </>
        ) : (
          <AppButton
            className="icon-button"
            onClick={() => onEditStart(task.id, task.title)}
            label=""
            icon={<PencilIcon className="icon" />}
          />
        )}

        <AppButton
          className="icon-button"
          onClick={() => onDelete(task.id)}
          label=""
          icon={<TrashIcon className="icon" />}
        />
      </div>
    </li>
  );
}
