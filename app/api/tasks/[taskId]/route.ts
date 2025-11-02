import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { UpdateTaskSchema } from "@/app/lib/validation";

/**
 * PUT /api/tasks/:taskId
 * Oppdaterer title eller completed på en task.
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params; // 👈 må awaites

  try {
    const body = await req.json();
    const { title, completed } = UpdateTaskSchema.parse(body);

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { title, completed },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT /api/tasks/[taskId] failed:", err.message ?? err);
    return NextResponse.json(
      { message: "Kunne ikke oppdatere task" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/:taskId
 * Sletter en task.
 */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;

  try {
    await prisma.task.delete({ where: { id: taskId } });
    return new NextResponse(null, { status: 204 }); //Vellykket sletting
  } catch (err: any) {
    console.error("DELETE /api/tasks/[taskId] failed:", err.message ?? err);
    return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
  }
}

/**
 * GET /api/tasks/:taskId
 * Henter én task.
 */
export async function GET(
  _req: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task)
      return NextResponse.json({ message: "Fant ikke task" }, { status: 404 });
    return NextResponse.json(task);
  } catch (err: any) {
    console.error("GET /api/tasks/[taskId] failed:", err.message ?? err);
    return NextResponse.json(
      { message: "Kunne ikke hente task" },
      { status: 500 }
    );
  }
}
