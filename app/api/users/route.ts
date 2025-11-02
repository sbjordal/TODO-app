/**
 * API Route: /api/users
 *
 * GET: Henter første bruker i databasen.
 * (Midlertidig løsning før autentisering + flere brukere er på plass)
 */
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/**
 * GET /api/users
 * Henter første bruker i databasen. (midlertidig løsning)
 */
export async function GET() {
    try {
        const user = await prisma.user.findFirst();

        if (!user) {
            return NextResponse.json(
                { message: "Ingen bruker funnet" },
                { status: 404 });
        }
        return NextResponse.json(user, { status: 200 }); //Success
    } catch (err) {
        console.error("GET /api/users failed:", err);
        return NextResponse.json({ message: "Kunne ikke hente bruker" }, { status: 500 });
    }
}
