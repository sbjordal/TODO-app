'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { v4 as uuidv4 } from "uuid";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const CreateListSchema = z.object({
    userId: z.string(),
    name: z.string()
        .min(1, "List name must be at least 1 character")
        .max(140, "List name can be max 140 characters"),
})

const CreateTaskSchema = z.object({
    listId: z.string(),
    title: z.string()
        .min(1, "Title must be at least 1 character")
        .max(140, "Title can be max 140 characters"),
})

export async function createList(formData: FormData) {
  const { userId, name } = CreateListSchema.parse({
    userId: formData.get('userId'),
    name: formData.get('name'),
  });

  const id = uuidv4(); // generer ny UUID

  await sql`
    INSERT INTO "List" ("id", "userId", "name", "createdAt", "updatedAt")
    VALUES (${id}, ${userId}, ${name}, now(), now())
  `;

  revalidatePath(`/dashboard/`);
}
export async function createTask(formData: FormData) {
    const { listId, title } = CreateTaskSchema.parse({
        listId: formData.get('listId'),
        title: formData.get('title'), 
    });

  const id = uuidv4(); 

  await sql`
    INSERT INTO "Task" 
      ("id", "listId", "title", "completed", "tags", "createdAt", "updatedAt") 
    VALUES 
      (${id}, ${listId}, ${title}, false, '{}', now(), now())
  `;

  revalidatePath(`/dashboard/${listId}`);
}

export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  const [task] = await sql<{ listId: string }[]>`
    SELECT "listId" FROM "Task" WHERE "id" = ${taskId}
  `;
  if (!task) throw new Error("Fant ikke task");

  await sql`
    UPDATE "Task"
    SET "completed" = ${completed}, "updatedAt" = now()
    WHERE "id" = ${taskId}
  `;

  revalidatePath(`/dashboard/${task.listId}`); //revaliderer page: Oppdaterer innhold
}

export async function deleteTask(taskId: string) {
  if (!taskId) throw new Error("Mangler taskId");

  const [task] = await sql<{ listId: string }[]>`
    SELECT "listId" FROM "Task" WHERE "id" = ${taskId}
  `;
  if (!task) throw new Error("Fant ikke task");

  await sql`
    DELETE FROM "Task"
    WHERE "id" = ${taskId}
  `;

  revalidatePath(`/dashboard/${task.listId}`); //revaliderer page: Oppdaterer innhold
}
