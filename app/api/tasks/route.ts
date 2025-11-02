/**
 * API Route: /api/tasks
 *
 * Håndterer:
 * - GET:  Hent alle tasks for en gitt bruker
 * - POST: Opprett ny task
 */

import { CreateTaskSchema } from "@/app/lib/validation";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * GET /api/tasks
 * Henter tasks 
 */
export async function GET(req: Request) {
    //Henter ut query-parametre fra URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;

    if (!userId) {
        return NextResponse.json({ message: "Mangler userId"}, { status: 400});
    }

    try {
        const tasks = await prisma.task.findMany({
            where : { list: { userId } },
            orderBy: { createdAt: "desc" },
            include: { list: true }, //Kan inkludere tilhørende liste
            });
        return NextResponse.json(tasks, { status: 200 }); //suksess
    } catch (err) {
        console.error("GET /api/tasks failed", err);
        return NextResponse.json({ message: "Kunne ikke hente tasks" }, { status: 500 }); //uventet serverfeil
    }
}

/**
 * POST /api/tasks
 * Oppretter en ny task i databasen.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Det som skal oppdateres (fra klient)
        const { title, listId, tags } = CreateTaskSchema.parse(body); //validerer
        const task = await prisma.task.create({
        data: {
            title,
            completed: false,
            tags: tags ?? [],
            list: { connect: { id: listId } },
        },
        });
        return NextResponse.json(task, { status: 201 }); //Created (success)
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { message: err.issues[0]?.message ?? "Ugyldig input" },
                { status: 422 }); //ugyldig input (valideringsfeil)
        }
    console.error("POST /api/tasks failed", err);
    return NextResponse.json({ message: "Uventet feil" }, { status: 500 }); //uventet serverfeil
    }
}


