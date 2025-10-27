import { fetchListWithTasks } from "@/app/lib/data";
import CreateTaskForm from "../../ui/components/CreateTaskForm";
import TaskList from "../../ui/components/TaskList";
import AppButton from "@/app/ui/components/AppButton";
import { HomeIcon } from "@heroicons/react/24/outline";

type Props = {
  params: { listId: string };
};

export default async function ListPage({ params }: Props) {
  const resolvedParams = await params; 
  const listId = resolvedParams.listId;
  const list = await fetchListWithTasks(listId);

  return (
    <div className="page-container">
      <h1 className="page-title">{list.name}</h1>

      <TaskList tasks={list.tasks} />
      <CreateTaskForm listId={list.id} />
      <div className="center-container">
        <AppButton
        path="/dashboard"
        label="Tilbake"
        icon={<HomeIcon className="button-icon" />}
        className="my-button"
        />
      </div>
    </div>
    
  );
}