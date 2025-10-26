'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from './prisma';

// Zod-skjemaer for validering
const CreateListSchema = z.object({
  userId: z.string(),
  name: z.string()
    .min(1, 'List name must be at least 1 character')
    .max(140, 'List name can be max 140 characters'),
});

const CreateTaskSchema = z.object({
  listId: z.string(),
  title: z.string()
    .min(1, 'Title must be at least 1 character')
    .max(140, 'Title can be max 140 characters'),
});

const UpdateTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title must be at least 1 character')
    .max(140, 'Title can be max 140 characters'),
});

const UpdateListSchema = z.object({
  name: z.string()
    .min(1, 'List name must be at least 1 character')
    .max(140, 'List name can be max 140 characters'),
});

function getZodMessage(err: z.ZodError) {
  return err.issues[0]?.message ?? 'Ugyldig input';
}

// Opprett liste
export async function createList(formData: FormData) {
  try {
    const { userId, name } = CreateListSchema.parse({
      userId: formData.get('userId'),
      name: formData.get('name'),
    });

    await prisma.list.create({
      data: {
        id: uuidv4(),
        userId,
        name,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) };
    }
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Opprett oppgave
export async function createTask(formData: FormData) {
  try {
    const { listId, title } = CreateTaskSchema.parse({
      listId: formData.get('listId'),
      title: formData.get('title'),
    });

    await prisma.task.create({
      data: {
        id: uuidv4(),
        listId,
        title,
        completed: false,
        tags: [], // bruker JSON-felt for tags
      },
    });

    revalidatePath(`/dashboard/${listId}`);
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) };
    }
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Toggle oppgave
export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  try {
    if (!taskId) return { success: false, status: 400, message: 'Mangler taskId' };

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return { success: false, status: 404, message: 'Fant ikke task' };

    await prisma.task.update({
      where: { id: taskId },
      data: { completed },
    });

    revalidatePath(`/dashboard/${task.listId}`);
    return { success: true };
  } catch (err) {
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Oppdater oppgave
export async function updateTask(taskId: string, newTitle: string) {
  try {
    UpdateTaskSchema.parse({ title: newTitle });

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return { success: false, status: 404, message: 'Fant ikke task' };

    await prisma.task.update({
      where: { id: taskId },
      data: { title: newTitle },
    });

    revalidatePath(`/dashboard/${task.listId}`);
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) };
    }
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Slett oppgave
export async function deleteTask(taskId: string) {
  try {
    if (!taskId) return { success: false, status: 400, message: 'Mangler taskId' };

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return { success: false, status: 404, message: 'Fant ikke task' };

    await prisma.task.delete({ where: { id: taskId } });

    revalidatePath(`/dashboard/${task.listId}`);
    return { success: true };
  } catch (err) {
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Oppdater liste
export async function updateList(listId: string, newName: string) {
  try {
    UpdateListSchema.parse({ name: newName });

    const list = await prisma.list.findUnique({ where: { id: listId } });
    if (!list) return { success: false, status: 404, message: 'Fant ikke listen' };

    await prisma.list.update({
      where: { id: listId },
      data: { name: newName },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, status: 422, message: getZodMessage(err) };
    }
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}

// Slett liste
export async function deleteList(listId: string) {
  try {
    if (!listId) return { success: false, status: 400, message: 'Mangler listId' };

    const list = await prisma.list.findUnique({ where: { id: listId } });
    if (!list) return { success: false, status: 404, message: 'Fant ikke listen' };

    await prisma.list.delete({ where: { id: listId } });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    console.error('Uventet feil:', err);
    return { success: false, status: 500, message: 'Uventet feil på server' };
  }
}
