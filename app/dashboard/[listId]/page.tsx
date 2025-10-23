import { fetchListWithTasks } from "@/app/lib/data";
import TaskForm from "../../ui/components/TaskForm";
import TaskList from "../../ui/components/TaskList";

type Props = {
  params: { listId: string };
};

export default async function ListPage({ params }: Props) {
  const resolvedParams = await params; // unwrap promise
  const listId = resolvedParams.listId;

  if (!listId) throw new Error("Invalid listId");

  const list = await fetchListWithTasks(listId);
  if (!list) throw new Error("List not found");

  return (
    <div className="max-w-2xl mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {list.name}
      </h1>

      <TaskList tasks={list.tasks} />
      <TaskForm listId={list.id} />
    </div>
  );
}
