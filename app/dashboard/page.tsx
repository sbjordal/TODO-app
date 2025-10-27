import ListCard from "@/app/ui/components/ListCard";
import SearchBar from "@/app/ui/components/SearchBar";
import { fetchUser, fetchLists, fetchTasksByUser } from "@/app/lib/data";
import { TodoList, Task } from "@/app/lib/definitions";
import AppButton from "@/app/ui/components/AppButton";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default async function DashboardPage() {
  const user = await fetchUser();
  const lists: TodoList[] = await fetchLists(user.id);
  const tasks: Task[] = await fetchTasksByUser(user.id);

  return (
    <main className="page-container">
      <h1 className="page-title">Hei {user.firstname}! 👋</h1>
      <p className="page-subtitle">
        Her er listene dine:</p>

      <div className="list-grid">
        {lists.length === 0 ? (
          <p className="page-subtitle"> 
          Du har ingen lister enda.</p>
        ) : (
          lists.map((list) => 
          <ListCard key={list.id} list={list} />)
        )}
      </div>

      <div className="center-container">
        <AppButton 
        path="/dashboard/create"
        label="Opprett ny liste"
        className="my-button"
        icon={<PlusIcon className="button-icon flex justify=center" />}/>
      </div>
      <div className="center-container">
        <SearchBar placeholder="Søk i alle oppgaver..." tasks={tasks} />
      </div>
    </main>
  );
}
