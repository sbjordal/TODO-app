import { fetchListWithTasks } from "@/app/lib/data";
import TaskForm from "./TaskForm";
import Link from "next/link";

export default async function ListPage(props: { params: Promise<{ listId: string }> }) {
    const params = await props.params;
    const { listId } = params;

    const list = await fetchListWithTasks(listId);
        
    if (!list) {
        return (
            <main className="p-6">
                <p> Fant ikke listen </p>
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Tilbake til dashboard
                </Link>
            </main>
        );
    }
    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{list.name}</h1>
            <ul className="space-y-2">
                {list.tasks.map((task) => (
                    <li key={task.id} className="p-3 rounded-lg bg-gray-100">
                        <span className={task.completed ? "line-through text-gray-500" : ""}>
                            {task.title}    
                        </span>
                    </li>
                ))}
            </ul>
            <TaskForm listId={listId} />
        </main>
    )


}


