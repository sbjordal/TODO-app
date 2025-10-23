import ListForm from "../../ui/components/ListForm";
import { fetchUser, fetchLists } from "@/app/lib/data";
import BackToDashboardButton from "@/app/ui/components/BackToDashboardButton";

export default async function CreateListPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  const lists = await fetchLists(user.id);

  return (
    <main className="page-container">
      <h1 className="page-title">Lag ny liste</h1>

      {lists.length > 0 ? (
        <ul className="task-list">
          {lists.map((list) => (
            <li key={list.id}>
              {list.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="page-subtitle">Du har ingen lister enda</p>
      )}

      <ListForm userId={user.id} />
      <BackToDashboardButton />
    </main>
  );
}
