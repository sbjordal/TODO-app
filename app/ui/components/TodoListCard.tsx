// TodoListCard.tsx
import Link from "next/link";
import { TodoList } from "@/app/lib/definitions";

export default function TodoListCard({ list }: { list: TodoList }) {
  return (
    <Link
      href={`/dashboard/${list.id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-gray-800">{list.name}</h2>
      
    </Link>
  );
}
