'use server'

import { revalidatePath } from 'next/cache'
import {
  CreateListSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  UpdateListSchema,
} from "@/app/lib/validation";

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client-side
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return base;
}

// Opprett liste
export async function createList(formData: FormData) {
  const parsed = CreateListSchema.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      message: parsed.error.issues[0]?.message ?? 'Ugyldig input',
    }
  }

  const res = await fetch(`${getBaseUrl()}/api/lists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: 'Klarte ikke å opprette listen',
    }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

// Opprett task
export async function createTask(formData: FormData) {
  const parsed = CreateTaskSchema.safeParse({
    listId: formData.get('listId'),
    title: formData.get('title'),
  })

  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      message: parsed.error.issues[0]?.message ?? 'Ugyldig input',
    }
  }

  const res = await fetch(`${getBaseUrl()}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  revalidatePath(`/dashboard/${parsed.data.listId}`)
  return { success: res.ok }
}

// Oppdatere task som completed (true/false)
export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// Oppdatere tittel på task
export async function updateTask(taskId: string, newTitle: string) {
  const parsed = UpdateTaskSchema.safeParse({ title: newTitle })
  if (!parsed.success) return { success: false, status: 422 }

  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// Slett task 
export async function deleteTask(taskId: string) {
  const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, { method: 'DELETE' })
  revalidatePath('/dashboard')
  return { success: res.ok }
}

// Oppdatere tittel på liste
export async function updateList(listId: string, newName: string) {
  const parsed = UpdateListSchema.safeParse({ name: newName })
  if (!parsed.success) return { success: false, status: 422 }

  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// Slett liste
export async function deleteList(listId: string) {
  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, { method: 'DELETE' })
  revalidatePath('/dashboard')
  return { success: res.ok }
}
