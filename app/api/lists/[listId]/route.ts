/**
 * API Route: /api/lists/[listId]
 *
 * Håndterer:
 * - GET:  Henter én liste med alle tilhørende tasks
 * - PUT:  Oppdaterer navnet på en liste
 * - DELETE: Sletter listen og alle tasks som tilhører den
 */

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { UpdateListSchema } from "@/app/lib/validation";
import { z } from "zod";

/**
 * GET /api/lists/:listId
 * Henter en spesifikk liste med tilhørende tasks.
 */
export async function GET(_req: Request, context: { params: Promise<{ listId: string }> }) {
    const { listId } = await context.params;

    try {
        const list = await prisma.list.findUnique({
            where: { id: listId },
            include: { tasks: { orderBy: { createdAt: "asc" } } },});

        if (!list) {
        return NextResponse.json({ message: "Fant ikke listen" }, { status: 404 });
        }

        return NextResponse.json(list);
    } catch (err: any) {
        console.error("GET /api/lists/[listId] failed:", err.message ?? err);
        return NextResponse.json({ message: "Kunne ikke hente listen" }, { status: 500 });
    }
}

/**
 * PUT /api/lists/:listId
 * Oppdaterer navnet på en eksisterende liste.
 */
export async function PUT(req: Request, context: { params: Promise<{ listId: string }> }) {
    const { listId } = await context.params;

    try {
        const body = await req.json();
        const { name } = UpdateListSchema.parse(body); //validere

        const updated = await prisma.list.update({
            where: { id: listId },
            data: { name },});

        return NextResponse.json(updated, { status: 200 });
    } catch (err: any) {
        if (err instanceof z.ZodError){
            return NextResponse.json(
                { message: err.issues[0]?.message ?? "Ugyldig input" },
                { status: 422 }); //Ugyldig input (valideringsfeil)
        }
        console.error("PUT /api/lists/[listId] failed:", err.message ?? err);
        return NextResponse.json({ message: "Kunne ikke oppdatere listen" },{ status: 500 });
    }
}

/**
 * DELETE /api/lists/:listId
 * Sletter liste og alle tasks som tilhører den.
 */
export async function DELETE(_req: Request, context: { params: Promise<{ listId: string }> }) {
    const { listId } = await context.params;

    try {
        const list = await prisma.list.findUnique({ where: { id: listId } });
        if (!list) {
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