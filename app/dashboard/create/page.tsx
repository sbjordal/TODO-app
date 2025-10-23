// app/dashboard/create/page.tsx
import ListForm from "../../ui/components/ListForm";
import { fetchUser } from "@/app/lib/data";
import BackToDashboardButton from "@/app/ui/components/BackToDashboardButton";

export default async function CreateListPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  return (
    <main className="page-container">
      <h1 className="page-title">Lag ny liste</h1>
      <ListForm userId={user.id} />
      <BackToDashboardButton />
    </main>
  );
}
