/**
 * API Route: /api/tasks/[taskId]
 *
 * Håndterer CRUD-operasjoner for en enkelt Task.
 * - GET:    Henter én task.
 * - PUT:    Oppdaterer tittel eller status (completed).
 * - DELETE: Sletter task.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { UpdateTaskSchema } from "@/app/lib/validation";
import { z } from "zod";


/**
 * GET /api/tasks/:taskId
 * Henter én spesifikk task basert på ID.
 */
export async function GET(
    _req: Request,
    context: { params: Promise<{ taskId: string }> }) {
    const { taskId } = await context.params;

    try {
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            return NextResponse.json({ message: "Fant ikke task" }, { status: 404 });
        return NextResponse.json(task);
    } catch (err: any) {
        console.error("GET /api/tasks/[taskId] failed:", err.message ?? err);
        return NextResponse.json({ message: "Kunne ikke hente task" }, { status: 500 });
    }
}


/**
 * PUT /api/tasks/:taskId
 * Oppdaterer tittel og/eller fullføringsstatus på en task.
 */
export async function PUT(req: Request, context: { params: Promise<{ taskId: string }> }) {
    const { taskId } = await context.params;

    try {
        const body = await req.json(); //Hva som skal oppdateres (fra klienten)
        const { title, completed } = UpdateTaskSchema.parse(body);

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: { title, completed },
            });
        return NextResponse.json(updated);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { message: err.issues[0]?.message ?? "Ugyldig input" },
                { status: 422 });
        }
        if (err.code === "P2025") {
            return NextResponse.json({ message: "Task ikke funnet" },{ status: 404 });}
        console.error("PUT /api/tasks/[taskId] failed:", err.message ?? err);
        return NextResponse.json({ message: "Kunne ikke oppdatere task" }, { status: 500 });
    }
}

/**
 * DELETE /api/tasks/:taskId
 * Sletter en task fra databasen
 */
export async function DELETE(_req: Request, context: { params: Promise<{ taskId: string }> }) {
    const { taskId } = await context.params;

    try {
        await prisma.task.delete({ where: { id: taskId } });
        return new NextResponse(null, { status: 204 }); // Suksess, ingen innhold
    } catch (err: any) {
        if (err.code == "P2025") {
            return NextResponse.json({ message: "Task ikke funnet"}, { status: 404 });
        }
        console.error("DELETE /api/tasks/[taskId] failed:", err.message ?? err);
        return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
    }
}