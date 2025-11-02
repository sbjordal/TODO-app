import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/**
 * GET /api/lists/:listId
 * Henter en spesifikk liste og tilhørende tasks.
 */
export async function GET(
  _req: Request,
  context: { params: Promise<{ listId: string }> }
) {
  try {
    const { listId } = await context.params; // 👈 må awaites

    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: { tasks: { orderBy: { createdAt: "asc" } } },
    });

    if (!list) {
      return NextResponse.json({ message: "Fant ikke listen" }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (err: any) {
    console.error("GET /api/lists/[listId] failed:", err.message ?? err);
    return NextResponse.json(
      { message: "Kunne ikke hente listen" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/lists/:listId
 * Oppdaterer navn på liste.
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ listId: string }> }
) {
  const { listId } = await context.params;

  try {
    const { name } = await req.json();

    const updated = await prisma.list.update({
      where: { id: listId },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT /api/lists/[listId] failed:", err.message ?? err);
    return NextResponse.json(
      { message: "Ugyldig input eller serverfeil" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/lists/:listId
 * Sletter liste og alle tasks.
 */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ listId: string }> }
) {
  const { listId } = await context.params;

  try {
    const existing = await prisma.list.findUnique({ where: { id: listId } });
    if (!existing) {
      return NextResponse.json({ message: "Fant ikke listen" }, { status: 404 });
    }

    await prisma.task.deleteMany({ where: { listId } });
    await prisma.list.delete({ where: { id: listId } });

    return new NextResponse(null, { status: 204 }); //Vellykket sletting
  } catch (err: any) {
    console.error("DELETE /api/lists/[listId] failed:", err.message ?? err);
    return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
  }
}
