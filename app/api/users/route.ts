import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { AppError } from "@/app/lib/errors";

/**
 * Henter første bruker i databasen.
 * 
 * Midlertidig løsning for utvikling.
 * I en virkelig app ville du identifisere brukeren via auth-token eller session.
 */
export async function GET() {
  try {
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { message: "Ingen bruker funnet" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("GET /api/users failed:", err);
    return NextResponse.json(
      { message: "Kunne ikke hente bruker" },
      { status: 500 }
    );
  }
}
