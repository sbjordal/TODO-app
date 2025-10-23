import { fetchListWithTasks } from "@/app/lib/data";
import TaskForm from "../../ui/components/TaskForm";
import TaskList from "../../ui/components/TaskList";
import DashboardHeader from "@/app/ui/components/CreateListButton";
import BackToDashboardButton from "@/app/ui/components/BackToDashboardButton";

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
    <div className="page-container">
      <h1 className="page-title">
        {list.name}
      </h1>

      <TaskList tasks={list.tasks} />
      <TaskForm listId={list.id} />
      <BackToDashboardButton/>
    </div>
    
  );
}
