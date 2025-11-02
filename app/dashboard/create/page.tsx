import CreateListForm from "@/app/ui/components/CreateListForm";
import { fetchUser, fetchLists } from "@/app/lib/data";
import AppButton from "@/app/ui/components/AppButton";
import { HomeIcon } from "@heroicons/react/24/outline";
import type { TodoList } from "@/app/lib/definitions";

export default async function CreateListPage() {
  const user = await fetchUser();
  const lists: TodoList[] = await fetchLists(user.id);

  return (
    <main className="page-container">
      <h1 className="page-title">Lag ny liste</h1>

      {lists.length > 0 ? (
        <ul className="task-list">
          {lists.map((list) => (
            <li key={list.id}>{list.name}</li>
          ))}
        </ul>
      ) : (
        <p className="page-subtitle">Du har ingen lister enda</p>
      )}

      <CreateListForm userId={user.id} />

      <div className="center-container">
        <AppButton
          path="/dashboard"
          label="Tilbake"
          className="my-button"
          icon={<HomeIcon className="button-icon" />}
        />
      </div>
    </main>
  );
}
