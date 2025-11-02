import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { CreateListSchema } from "@/app/lib/validation";

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

    return NextResponse.json(lists);
  } catch (err: any) {
    console.error("GET /api/lists failed:", err.message ?? err);
    return NextResponse.json({ message: "Kunne ikke hente lister" }, { status: 500 });
  }
}

/**
 * POST /api/lists
 * Oppretter ny liste.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name } = CreateListSchema.parse(body);

    const list = await prisma.list.create({
      data: { userId, name },
      include: { tasks: true },
    });

    return NextResponse.json(list, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/lists failed:", err.message ?? err);
    return NextResponse.json({ message: "Uventet feil" }, { status: 500 });
  }
}
