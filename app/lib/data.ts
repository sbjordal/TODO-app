import { prisma } from "./prisma";
import { Task, TodoList, User } from "./definitions";
import { AppError } from "./errors";

/**
 * Henter alle lister for en gitt bruker
 */
export async function fetchLists(userId: string) {
  if (!userId) throw new AppError(400, "Mangler bruker-ID");

  try {
    const lists = await prisma.list.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return lists;
  } catch (err) {
    console.error("Databasefeil ved henting av lister:", err);
    throw new AppError(500, "Kunne ikke hente lister");
  }
}

/**
 * Henter en spesifikk liste med alle tilhørende tasks
 */
export async function fetchListWithTasks(listId: string) {
  if (!listId) throw new AppError(400, "Mangler listId");

  try {
    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: {
        tasks: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!list) throw new AppError(404, "Fant ikke listen");

    return list;
  } catch (err) {
    console.error("Databasefeil ved henting av liste med oppgaver:", err);
    throw new AppError(500, "Kunne ikke hente liste");
  }
}

/**
 * Henter alle tasks for en bruker (gjennom listene)
 */
export async function fetchTasksByUser(userId: string) {
  if (!userId) throw new AppError(400, "Mangler bruker-ID");

  try {
    const tasks = await prisma.task.findMany({
      where: {
        list: {
          userId,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return tasks;
  } catch (err) {
    console.error("Databasefeil ved henting av brukerens tasks:", err);
    throw new AppError(500, "Kunne ikke hente oppgaver");
  }
}

/**
 * Henter én spesifikk task
 */
export async function fetchTask(taskId: string) {
  if (!taskId) throw new AppError(400, "Mangler taskId");

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) throw new AppError(404, "Fant ikke oppgaven");

    return task;
  } catch (err) {
    console.error("Databasefeil ved henting av task:", err);
    throw new AppError(500, "Kunne ikke hente oppgave");
  }
}

/**
 * Henter alle tasks for en gitt liste
 */
export async function fetchTasksForList(listId: string) {
  if (!listId) throw new AppError(400, "Mangler listId");

  try {
    const tasks = await prisma.task.findMany({
      where: { listId },
      orderBy: { createdAt: "asc" },
    });

    return tasks;
  } catch (err) {
    console.error("Databasefeil ved henting av tasks for liste:", err);
    throw new AppError(500, "Kunne ikke hente oppgaver for listen");
  }
}

/**
 * Henter første bruker i databasen (enkel løsning for utvikling)
 */
export async function fetchUser() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) throw new AppError(404, "Fant ingen bruker");
    return user;
  } catch (err) {
    console.error("Databasefeil ved henting av bruker:", err);
    throw new AppError(500, "Kunne ikke hente bruker");
  }
}
