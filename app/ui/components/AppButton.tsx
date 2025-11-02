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
 * Gjenbrukbar knapp for navigasjon og handlinger.
 * Navigerer til `path` hvis satt, ellers kjører `onClick`.
 */ 
export default function AppButton({ path, label, className, icon, onClick}: Props) {
  const router = useRouter(); // for navigering mellom sider

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    else if (path) router.push(path);
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
