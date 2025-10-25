// ui/components/DeleteButton.tsx
"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  onClick: () => void;
  ariaLabel?: string;
};

export default function DeleteButton({ onClick}: Props) {
  return (
    <button
      onClick={onClick}
      className="remove-button"
    >
      <TrashIcon className="w-5 h-5 text-black-600" />
    </button>
  );
}
