// route.ts (POST)
import { CreateTaskSchema } from "@/app/lib/validation";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, listId, tags } = CreateTaskSchema.parse(await req.json());

    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
        tags: tags ?? [],
        list: { connect: { id: listId } },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
  console.error("POST /api/tasks failed", err);
  return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
}
}

/**
 * Henter tasks (kan filtreres på query, completed og userId)
 * Eksempel:
 *  /api/tasks?query=foo&completed=true&userId=abc123
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || undefined;
  const completedParam = searchParams.get("completed");
  const completed =
    completedParam === "true" ? true : completedParam === "false" ? false : undefined;
  const userId = searchParams.get("userId") || undefined;

  const where: any = {};
  if (query) {
    where.title = { contains: query, mode: "insensitive" };
  }
  if (completed !== undefined) {
    where.completed = completed;
  }
  if (userId) {
    where.list = { userId }; // 👈 kobler Task til bruker via list-relasjon
  }

  try {
    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { list: true }, // valgfritt, men nyttig for debugging
    });
    return NextResponse.json(tasks);
  } catch (err) {
    console.error("GET /api/tasks failed", err);
    return NextResponse.json(
      { message: "Kunne ikke hente tasks" },
      { status: 500 }
    );
  }
}
