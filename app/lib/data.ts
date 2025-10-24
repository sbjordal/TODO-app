import postgres from 'postgres';
import { TodoList, Task, User } from './definitions';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default sql;

export type TaskRow = {
  id: string;
  listId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function fetchLists(userId: string) {
    const lists = await sql<TodoList[]>`
        SELECT *
        FROM "List"
        WHERE "userId" = ${userId}
        ORDER BY "createdAt" DESC
        `;
    return lists;

}

export async function fetchListWithTasks(listId: string) {

    if (!listId){
        throw new Error('Invalid listId');
    }

    const lists = await sql<TodoList[]>`
        SELECT *
        FROM "List"
        WHERE "id" = ${listId}
        `;
    
    const list = lists[0];

    if (!list) {
        throw new Error('List not found');
    }

    const tasks = await sql<Task[]>`
        SELECT *
        FROM "Task"
        WHERE "listId" = ${listId}
        ORDER BY "createdAt" ASC
        `;
    return { ...list, tasks: tasks ?? [] };

}

export async function fetchTasksByUser(userId: string) {
    const tasks = await sql<Task[]>`
        SELECT t.*
        FROM "Task" t
        JOIN "List" l ON t."listId" = l."id"
        WHERE l."userId" = ${userId}
        ORDER BY t."createdAt" ASC
        `;
    return tasks;
}

export async function fetchTask(taskId: string) {
    const task = await sql<Task[]>`
        SELECT *
        FROM "Task"
        WHERE "id" = ${taskId}
        `;
    return task[0] ?? null;
}

export async function fetchTasksForList(listId: string) {
    const tasks = await sql<Task[]>`
        SELECT *
        FROM "Task"
        WHERE "listId" = ${listId}
        ORDER BY "createdAt" ASC
        `;
    return tasks;

}

export async function fetchUser() {
    const users = await sql<User[]>`
        SELECT *
        FROM "User"
        LIMIT 1
        `;
    return users[0] ?? null;

}