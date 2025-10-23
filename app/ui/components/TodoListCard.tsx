// TodoListCard.tsx
import Link from "next/link";
import { TodoList } from "@/app/lib/definitions";

export default function TodoListCard({ list }: { list: TodoList }) {
  return (
    <Link
      href={`/dashboard/${list.id}`}
      className="todo-list-card"
    >
      <h2 className="todo-list-card-title">{list.name}</h2>
    </Link>
  );
}
