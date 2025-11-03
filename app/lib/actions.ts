'use server'

import { revalidatePath } from 'next/cache'
import {
  CreateListSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  UpdateListSchema,
} from "@/app/lib/validation";

function getBaseUrl() { // for å få hele url til ruten
  if (typeof window !== "undefined") return ""; // client-side
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return base;
}

// Opprett liste
export async function createList(formData: FormData) {
  const parsed = CreateListSchema.safeParse({ //Validerer input
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

  const res = await fetch(`${getBaseUrl()}/api/lists`, { //sender request til api
    method: 'POST', //Opprette
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
  const parsed = CreateTaskSchema.safeParse({ //Validerer input
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

  const res = await fetch(`${getBaseUrl()}/api/tasks`, { //sender request til api
    method: 'POST', //Opprette
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  revalidatePath(`/dashboard/${parsed.data.listId}`)
  return { success: res.ok }
}

// Oppdatere task som completed (true/false)
export async function toggleTaskCompleted(taskId: string, completed: boolean) {
  try {
    const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, { //sender request til api
    method: 'PUT', //Oppdatere
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
  if (!res.ok) return {
    success: false,
    status: res.status,
    message: "Kunne ikke oppdatere task"
  }
  revalidatePath('/dashboard');
  return { success: true };

  } catch {
    return {success: false, status: 500, message: "Noe gikk galt"}
  }
  
}

// Oppdatere tittel på task
export async function updateTask(taskId: string, newTitle: string) {
  const parsed = UpdateTaskSchema.safeParse({ title: newTitle })
  if (!parsed.success) return { 
    success: false, status: 422, message: parsed.error.issues[0]?.message };

  try {
    const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, { //sender request til api
    method: 'PUT', //Oppdatere
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),});
    
    if (!res.ok) return {
      success: false, status: res.status, message: "Kunne ikke oppdatere tittel"};

    revalidatePath('/dashboard');
    return { success: true };
  } catch {
    return { success: false, status: 500, message: "Noe gikk galt"}
  }
}

// Slett task 
export async function deleteTask(taskId: string) {
  try{
    const res = await fetch(`${getBaseUrl()}/api/tasks/${taskId}`, { //sender request til api
      method: 'DELETE' }); //Slett
    if (!res.ok) return { success: false, status: res.status, message: "Kunne ikke slette task"};
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch {
    return { success: false, status: 500, message: "Noe gikk galt ved sletting"}
  }
}

// Oppdatere tittel på liste
export async function updateList(listId: string, newName: string) {
  const parsed = UpdateListSchema.safeParse({ name: newName })
  if (!parsed.success) return { 
    success: false, 
    status: 422, 
    message: parsed.error.issues[0]?.message ?? "Ugyldig input" ,
  };

  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, {
    method: 'PUT', //oppdatere
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) return {
      success: false,
      status: res.status,
      message: "Kunne ikke oppdatere listen",
    };

  revalidatePath('/dashboard')
  return { success: res.ok }
}

// Slett liste
export async function deleteList(listId: string) {
  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, { //sender request til api
    method: 'DELETE' }) //Slett
  revalidatePath('/dashboard')

  if (!res.ok) return {
    success: false,
    status: res.status,
    message: "Kunne ikke slette listen",
  };
  
  revalidatePath("/dashboard");
  return { success: true };
}
