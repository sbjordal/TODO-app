'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { Task, List } from './definitions';

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
    })

    await sql`
        INSERT INTO "List" ("userId", "name", "createdAt")
        VALUES (${userId}, ${name}, now())
        `;
    revalidatePath(`/dashboard/`);
}

export async function createTask(formData: FormData) {
    const { listId, title } = CreateTaskSchema.parse({
        listId: formData.get('listId'),
        title: formData.get('title'),
    })

    await sql`
        INSERT INTO "Task" ("listId", "title", "completed", "createdAt")
        VALUES (${listId}, ${title}, false, now())
        `;
    revalidatePath(`/dashboard/${listId}`);
}