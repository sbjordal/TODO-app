"use client";

type Task = {
  id: string;
  title: string;
};

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <input type="checkbox" />
            {task.title}
          </div>
          <button>×</button>
        </li>
      ))}
    </ul>
  );
}
