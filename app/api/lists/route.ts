/**
 * API Route: /api/lists
 *
 * Håndterer:
 * - GET:  Henter alle lister for en gitt bruker
 * - POST: Oppretter ny liste
 */
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { CreateListSchema } from "@/app/lib/validation";
import { z } from "zod";

/**
 * GET /api/lists?userId=<id>
 * Henter alle lister for en bruker.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        
        if (!userId) {
            return NextResponse.json({ message: "Mangler bruker-ID" }, { status: 400 });
        }

    const lists = await prisma.list.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { tasks: true },
        });

    return NextResponse.json(lists, { status: 200 }); //success
    } catch (err: any) {
        console.error("GET /api/lists failed:", err.message ?? err);
        return NextResponse.json({ message: "Kunne ikke hente lister" }, { status: 500 });
    }
}

/**
 * POST /api/lists
 * Oppretter ny liste for en user.
 */

export async function POST(req: Request) {
    try {
        const body = await req.json(); //Hva som skal oppdateres (fra klienten)
        const { userId, name } = CreateListSchema.parse(body);

        const list = await prisma.list.create({
        data: { userId, name },
        include: { tasks: true },
        });

        return NextResponse.json(list, { status: 201 }); //success, created
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { message: err.issues[0]?.message ?? "Ugyldig input" },
                { status: 422 });
        }
        console.error("POST /api/lists failed:", err.message ?? err);
        return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
  }
}