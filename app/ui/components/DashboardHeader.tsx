'use client';

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center mb-6">
      <button
        onClick={() => router.push("/dashboard/create")}
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Lag ny liste
      </button>
    </div>
    
  );
}

