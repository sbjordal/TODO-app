import { fetchLists, fetchUser } from "@/app/lib/data";
import Link from "next/link";

export default async function DashboardPage() {
    //TODO: Få userId fra databasen
    const userId = await fetchUser();
    if (!userId) {
        throw new Error('User not found');
    }
    const lists = await fetchLists(userId.id);

    return (
        <main className="flex flex-col items-center p-6 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Mine lister</h1>

            {lists.map((list) => (
            <Link
          key={list.id}
          href={`/dashboard/${list.id}`}
          className="w-full max-w-md p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
        >
          <h2 className="text-xl font-semibold">{list.name}</h2>
        </Link>
      ))}
    </main>
    )
}
