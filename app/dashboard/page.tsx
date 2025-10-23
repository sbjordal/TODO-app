import TodoListCard from "@/app/ui/components/TodoListCard";
import { fetchUser, fetchLists } from "@/app/lib/data";
import { TodoList } from "@/app/lib/definitions";
import DashboardHeader from "@/app/ui/components/DashboardHeader";


export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) throw new Error("User not found");

  const lists: TodoList[] = await fetchLists(user.id);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Mine lister</h1>
      <div className="flex flex-col w-full max-w-3xl gap-4">
        {lists.map((list) => (
          <TodoListCard key={list.id} list={list} />
        ))}
      </div>
      <DashboardHeader />
    </main>
  );
}
