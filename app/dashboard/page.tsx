import TodoListCard from "@/app/ui/components/TodoListCard";
import { fetchUser, fetchLists } from "@/app/lib/data";
import { TodoList } from "@/app/lib/definitions";
import CreateListButton from "@/app/ui/components/CreateListButton";
import BackToDashboardButton from "../ui/components/BackToDashboardButton";

export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  const lists: TodoList[] = await fetchLists(user.id);

  return (
    <main className="page-container">
      <h1 className="page-title">Mine lister</h1>
      <div className="list-grid">
        {lists.map((list) => (
          <TodoListCard key={list.id} list={list} />
        ))}
      </div>

      <CreateListButton />
    </main>
  );
}
