'use client';

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  path?: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;  
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * @component AppButton
 * 
 * En gjenbrukbar knappkomponent som enten:
 * - Navigerer til en gitt `path` (via Next.js router), eller
 * - Utfører en `onClick`-funksjon hvis den er spesifisert.
 * 
 * Brukes over hele appen for å sikre konsistent knappestil og enkel navigasjon.
 * 
 * Props:
 * - `path` (string, optional): URL/sti som brukeren navigeres til ved klikk.
 * - `label` (string, required): Teksten som vises på knappen.
 * - `className` (string, optional): Ekstra CSS-klasser for styling.
 * - `icon` (ReactNode, optional): Ikon som vises til venstre for label.
 * - `onClick` (function, optional): Egendefinert handler som kjøres ved klikk.
 */ 
export default function AppButton({ path, label, className, icon, onClick}: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <button
      className={`my-button flex items-center ${className ?? ""}`}
      onClick={handleClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}
