// app/dashboard/create/page.tsx
import DashboardHeader from "@/app/ui/components/DashboardHeader";
import ListForm from "../../ui/components/ListForm";
import { fetchUser } from "@/app/lib/data";

export default async function CreateListPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-6">
      <DashboardHeader />

      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Lag ny liste</h1>
        <ListForm userId={user.id} />
      </div>
    </main>
  );
}
