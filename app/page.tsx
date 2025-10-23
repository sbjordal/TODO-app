'use client';

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            TODO
          </h1>

          <button
            onClick={() => router.push("/dashboard")}
            className="my-button"
          >
            Vis mine lister
          </button>
        </div>
      </main>
    </div>
  );
}
