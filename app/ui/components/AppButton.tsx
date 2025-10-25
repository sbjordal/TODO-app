'use client';

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  path?: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;  
  onClick?: () => void;
};

export default function AppButton({ path, label, className, icon, onClick}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <button
      className={`my-button flex items-center ${className ?? ""}`} // 👈 flex for ikon + tekst
      onClick={handleClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}
