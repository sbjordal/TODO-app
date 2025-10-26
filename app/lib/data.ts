import postgres from 'postgres';
import { Task, TodoList, User } from './definitions';
import { AppError } from './errors';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default sql;

export async function fetchLists(userId: string) {
  if (!userId) throw new AppError(400, 'Mangler bruker-ID');

  try {
    const lists = await sql<TodoList[]>`
      SELECT *
      FROM "List"
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
    `;
    return lists;
  } catch (err) {
    console.error('Databasefeil ved henting av lister:', err);
    throw new AppError(500, 'Kunne ikke hente lister');
  }
}

export async function fetchListWithTasks(listId: string) {
  if (!listId) throw new AppError(400, 'Mangler listId');

  try {
    const lists = await sql<TodoList[]>`
      SELECT *
      FROM "List"
      WHERE "id" = ${listId}
    `;

    const list = lists[0];
    if (!list) throw new AppError(404, 'Fant ikke listen');

    const tasks = await sql<Task[]>`
      SELECT *
      FROM "Task"
      WHERE "listId" = ${listId}
      ORDER BY "createdAt" ASC
    `;

    return { ...list, tasks: tasks ?? [] };
  } catch (err) {
    console.error('Databasefeil ved henting av liste med oppgaver:', err);
    throw new AppError(500, 'Kunne ikke hente liste');
  }
}

export async function fetchTasksByUser(userId: string) {
  if (!userId) throw new AppError(400, 'Mangler bruker-ID');

  try {
    const tasks = await sql<Task[]>`
      SELECT t.*
      FROM "Task" t
      JOIN "List" l ON t."listId" = l."id"
      WHERE l."userId" = ${userId}
      ORDER BY t."createdAt" ASC
    `;
    return tasks;
  } catch (err) {
    console.error('Databasefeil ved henting av brukerens tasks:', err);
    throw new AppError(500, 'Kunne ikke hente oppgaver');
  }
}

export async function fetchTask(taskId: string) {
  if (!taskId) throw new AppError(400, 'Mangler taskId');

  try {
    const task = await sql<Task[]>`
      SELECT *
      FROM "Task"
      WHERE "id" = ${taskId}
    `;
    if (!task[0]) throw new AppError(404, 'Fant ikke oppgaven');
    return task[0];
  } catch (err) {
    console.error('Databasefeil ved henting av task:', err);
    throw new AppError(500, 'Kunne ikke hente oppgave');
  }
}

export async function fetchTasksForList(listId: string) {
  if (!listId) throw new AppError(400, 'Mangler listId');

  try {
    const tasks = await sql<Task[]>`
      SELECT *
      FROM "Task"
      WHERE "listId" = ${listId}
      ORDER BY "createdAt" ASC
    `;
    return tasks;
  } catch (err) {
    console.error('Databasefeil ved henting av tasks for liste:', err);
    throw new AppError(500, 'Kunne ikke hente oppgaver for listen');
  }
}

export async function fetchUser() {
  try {
    const users = await sql<User[]>`
      SELECT *
      FROM "User"
      LIMIT 1
    `;
    if (!users[0]) throw new AppError(404, 'Fant ingen bruker');
    return users[0];
  } catch (err) {
    console.error('Databasefeil ved henting av bruker:', err);
    throw new AppError(500, 'Kunne ikke hente bruker');
  }
}
