'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'


// --- Zod-skjemaer ---
const CreateTaskSchema = z.object({
  listId: z.string(),
  title: z.string().min(1).max(140),
})
const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(140),
})
const UpdateListSchema = z.object({
  name: z.string().min(1).max(140),
})

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client-side
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return base;
}

// --- Opprett liste ---
export async function createList(formData: FormData) {
  const userId = formData.get('userId') as string
  const name = formData.get('name') as string

  const res = await fetch(`${getBaseUrl()}/api/lists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, name }),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// --- Opprett task ---
export async function createTask(formData: FormData) {
  const parsed = CreateTaskSchema.safeParse({
    listId: formData.get('listId'),
    title: formData.get('title'),
  })
  if (!parsed.success) {
    return { success: false, status: 422, message: parsed.error.issues[0]?.message }
  }

  const res = await fetch(`${getBaseUrl()}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  revalidatePath(`/dashboard/${parsed.data.listId}`)
  return { success: res.ok }
}

// --- Toggle completed ---
export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// --- Oppdater tittel ---
export async function updateTask(taskId: string, newTitle: string) {
  const parsed = UpdateTaskSchema.safeParse({ title: newTitle })
  if (!parsed.success) return { success: false, status: 422 }

  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// --- Slett task ---
export async function deleteTask(taskId: string) {
  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, { method: 'DELETE' })
  revalidatePath('/dashboard')
  return { success: res.ok }
}

// --- Oppdater liste ---
export async function updateList(listId: string, newName: string) {
  const parsed = UpdateListSchema.safeParse({ name: newName })
  if (!parsed.success) return { success: false, status: 422 }

  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// --- Slett liste ---
export async function deleteList(listId: string) {
  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, { method: 'DELETE' })
  revalidatePath('/dashboard')
  return { success: res.ok }
}
