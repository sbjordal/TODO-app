'use server';

import { AppError } from './errors';
import type { TodoList, Task, User } from './definitions';

function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client-side
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return base;
}

/**
 * Henter første bruker i databasen (midlertidig løsning)
 */
export async function fetchUser(): Promise<User> {
  const res = await fetch(`${getBaseUrl()}/api/users`, { cache: 'no-store' });
  if (!res.ok) throw new AppError(res.status, 'Kunne ikke hente bruker');
  const data = await res.json();

  // Valider grovt — vi forventer et objekt med id
  if (!data || typeof data.id !== 'string') {
    throw new AppError(500, 'Ugyldig brukerdata fra API');
  }

  return data;
}

/**
 * Henter alle lister for en gitt bruker
 */
export async function fetchLists(userId: string): Promise<TodoList[]> {
  const res = await fetch(`${getBaseUrl()}/api/lists?userId=${userId}`, { cache: 'no-store' });
  if (!res.ok) throw new AppError(res.status, 'Kunne ikke hente lister');
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("fetchLists: forventet array, fikk:", data);
    throw new AppError(500, 'Ugyldig listeformat fra API');
  }

  return data;
}

/**
 * Henter én liste med tasks
 */
export async function fetchListWithTasks(listId: string): Promise<TodoList> {
  const res = await fetch(`${getBaseUrl()}/api/lists/${listId}`, { cache: 'no-store' });
  if (!res.ok) throw new AppError(res.status, 'Kunne ikke hente listen');
  const data = await res.json();
  return data;
}

/**
 * Henter alle tasks for en bruker
 */
export async function fetchTasksByUser(userId: string): Promise<Task[]> {
  const res = await fetch(`${getBaseUrl()}/api/tasks?userId=${userId}`, { cache: 'no-store' });
  if (!res.ok) throw new AppError(res.status, 'Kunne ikke hente tasks');
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new AppError(500, 'Ugyldig tasks-format fra API');
  }

  return data;
}
