import TodoListCard from "@/app/ui/components/TodoListCard";
import { fetchUser, fetchLists } from "@/app/lib/data";
import { TodoList } from "@/app/lib/definitions";
import CreateListButton from "@/app/ui/components/CreateListButton";

export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  const lists: TodoList[] = await fetchLists(user.id);

  return (
    <main className="page-container">
      <h1 className="page-title">Hei {user.firstname} 👋</h1>
      <p className="page-subtitle">
        Her er listene dine:
      </p>

      <div className="list-grid">
        {lists.map((list) => (
          <TodoListCard key={list.id} list={list} />
        ))}
      </div>

      <CreateListButton />
    </main>
  );
}
