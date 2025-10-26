'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { v4 as uuidv4 } from "uuid";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// Input-validering med zod:
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

const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be at least 1 character')
    .max(140, 'Title can be max 140 characters'),
});

const UpdateListSchema = z.object({
  name: z.string().min(1, "List name must be at least 1 character").max(140, "List name can be max 140 characters"),
});

function getZodMessage(err: z.ZodError) {
  return err.issues[0]?.message ?? 'Ugyldig input';
}

// Create:
export async function createList(formData: FormData) {

  try {
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
      return { success: true };
  } 
  catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) }; //422: valideringsfeil
    }
    console.error("Uventet feil: ", err)
    return { success: false, status: 500, message: "Uventet feil på server" };  }
  
}
export async function createTask(formData: FormData) {

  try {
    const { listId, title } = CreateTaskSchema.parse({
          listId: formData.get('listId'),
          title: formData.get('title'), 
      });

    const id = uuidv4(); // Genererer ny UUID

    await sql`
      INSERT INTO "Task" 
        ("id", "listId", "title", "completed", "tags", "createdAt", "updatedAt") 
      VALUES 
        (${id}, ${listId}, ${title}, false, '{}', now(), now())
    `;

    revalidatePath(`/dashboard/${listId}`);
    return ( { success: true })

  } catch (err){
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) };
    }
    console.error("Uventet feil: ", err)
    return { success: false, status: 500, message: "Uventet feil på server" }; //500: Uventet serverfeil
  }
    
}

//Update and delete:
export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  
  try {   
    if (!taskId)  return { success: false, status: 400, message: 'Mangler taskId' }; //400: Bad request

    const [task] = await sql<{ listId: string }[]>`
      SELECT "listId" FROM "Task" WHERE "id" = ${taskId}
    `;
    if (!task)  return { success: false, status: 404, message: 'Fant ikke task' }; //404: Not found

    await sql`
      UPDATE "Task"
      SET "completed" = ${completed}, "updatedAt" = now()
      WHERE "id" = ${taskId}
    `;

    revalidatePath(`/dashboard/${task.listId}`); //revaliderer page: Oppdaterer innhold
    return { success: true };
  } catch (err) {
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: "Uventet feil på server" }; //500: Internal server error
  }
}


export async function updateTask(taskId: string, newTitle: string) {

  try {
    UpdateTaskSchema.parse({ title: newTitle });

    const [task] = await sql<{ listId: string }[]>`
      SELECT "listId" FROM "Task" WHERE "id" = ${taskId}
    `;
    if (!task) return { success: false, status: 404, message: 'Fant ikke task' }; //404: Not found

    await sql`
      UPDATE "Task"
      SET "title" = ${newTitle}
      WHERE "id" = ${taskId}
    `;
    revalidatePath(`/dashboard/${task.listId}`);
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) }; //422: Valideringsfeil
    }
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: "Uventet feil på server" }; //500: Internal server error
  }
}

export async function deleteTask(taskId: string) {

  try {
    if (!taskId) return { success: false, status: 400, message: 'Mangler taskId' }; //400: Bad request

    const [task] = await sql<{ listId: string }[]>`
      SELECT "listId" FROM "Task" WHERE "id" = ${taskId}
    `;
    if (!task) return { success: false, status: 404, message: 'Fant ikke task' }; //404: Not found error

    await sql`
      DELETE FROM "Task"
      WHERE "id" = ${taskId}
    `;
    revalidatePath(`/dashboard/${task.listId}`); //revaliderer page: Oppdaterer innhold
    return { success: true };
  } catch (err){
    console.error('Uventet feil:', err);
   return { success: false, status: 500, message: "Uventet feil på server" };
  }
}

export async function updateList(listId: string, newName: string) {
  try {
    UpdateListSchema.parse({ name: newName });

    const [list] = await sql<{ id: string }[]>`
      SELECT "id" FROM "List" WHERE "id" = ${listId}
    `;
    if (!list) return { success: false, status: 400, message: 'Mangler listId' };

    await sql`
      UPDATE "List"
      SET "name" = ${newName}, "updatedAt" = now()
      WHERE "id" = ${listId}
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: err.issues[0]?.message };
    }
    console.error("Uventet feil:", err);
    return { success: false, status: 500, message: "Uventet feil på server" };
  }
}

export async function deleteList(listId: string) {
  try {
    if (!listId) return { success: false, status: 400, message: 'Mangler listId' };

    const [list] = await sql<{ id: string }[]>`
      SELECT "id" FROM "List" WHERE "id" = ${listId}
    `;
    if (!list) return { success: false, status: 404, message: 'Fant ikke listen' }; //404: Not found

    await sql`
      DELETE FROM "List"
      WHERE "id" = ${listId}
    `;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Uventet feil:", err);
    return { success: false, status: 500, message: "Uventet feil på server" };
  }
}