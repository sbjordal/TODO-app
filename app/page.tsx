import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            TODO
          </h1>

          <Link
            href="/dashboard"
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Vis mine lister
          </Link>
        </div>
      </main>
    </div>
  );
}
