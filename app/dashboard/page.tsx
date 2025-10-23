import TodoListCard from "@/app/ui/components/TodoListCard";
import { fetchUser, fetchLists } from "@/app/lib/data";
import { TodoList } from "@/app/lib/definitions";
import DashboardHeader from "@/app/ui/components/CreateListButton";

export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  const lists: TodoList[] = await fetchLists(user.id);

  return (
    <main className="dashboard">
      <h1 className="title">Mine lister</h1>
      <div className="list-grid">
        {lists.map((list) => (
          <TodoListCard key={list.id} list={list} />
        ))}
      </div>
      <DashboardHeader />
    </main>
  );
}
