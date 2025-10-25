'use client';

import { useRouter } from "next/navigation";
import React from "react";

type MyButtonProps = {
  path: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;  
};

export default function MyButton({ path, label, className, icon }: MyButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
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
