import TodoListCard from "@/app/ui/components/TodoListCard";
import Search from "@/app/ui/components/Search";
import { fetchUser, fetchLists, fetchTasksByUser } from "@/app/lib/data";
import { TodoList, Task } from "@/app/lib/definitions";
import MyButton from "@/app/ui/components/MyButton";
import { PlusIcon } from "@heroicons/react/24/outline"; 

export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

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
          <TodoListCard key={list.id} list={list} />)
        )}
      </div>

      <div className="center-container">
        <MyButton 
        path="/dashboard/create"
        label="Opprett ny liste"
        className="my-button"
        icon={<PlusIcon className="button-icon" />}/>
        
      </div>

      <div className="mt-10 flex justify-center">
        <Search placeholder="Søk i alle oppgaver..." tasks={tasks} />
      </div>
    </main>
  );
}
