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
 * Viser én enkelt oppgave med funksjonalitet for å:
 * - Markere som fullført / ikke fullført
 * - Redigere tittel
 * - Avbryte redigering
 * - Slette oppgaven
 *
 * Brukes i oppgavelister for å vise og håndtere individuelle oppgaver.
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
