// TodoListCard.tsx

import Link from "next/link";
import { TodoList } from "@/app/lib/definitions";

export default function ListCard({ list }: { list: TodoList }) {
  return (
    <Link
      href={`/dashboard/${list.id}`}
      className="list-card"
    >
      <h2 className="list-card-title">{list.name}</h2>
    </Link>
  );
}
