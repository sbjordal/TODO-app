/**
 * Testingen av prosjektet er på ingen måte ferdig. 
 * Fikk startet såvidt med vitest før innlevering.
 * Disse testene er delvis generert og forbedret med hjelp fra ChatGPT.
 * Jeg har tilpasset og validert koden selv for å sikre at den fungerer i prosjektet mitt.
 *
 * Hensikten med testene er å verifisere validering og oppførsel i createTask-funksjonen
 * uten å kjøre ekte databasekall eller Next.js-spesifikk logikk.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/app/lib/prisma", () => ({
  prisma: {
    task: {
      create: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { createTask } from "@/app/lib/actions";
import { prisma } from "@/app/lib/prisma";


// Hjelpefunksjon for å lage formdata
function makeFormData(listId: string, title: string) {
  const fd = new FormData();
  fd.append("listId", String(listId));
  fd.append("title", String(title));
  return fd;
}

describe("createTask (validering)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("feiler når tittelen er tom", async () => {
    const formData = makeFormData("list1", "");
    const result = await createTask(formData);

    expect(result.success).toBe(false);
    expect(result.status).toBe(422);
    expect(result.message).toMatch(/at least 1 character/i);
    expect(prisma.task.create).not.toHaveBeenCalled();
  });

  it("fungerer når tittelen er 5 tegn", async () => {
    const formData = makeFormData("list1", "Hello");
    (prisma.task.create as any).mockResolvedValue({
      id: "task1",
      title: "Hello",
    });

    const result = await createTask(formData);

    expect(result.success).toBe(true);
    expect(prisma.task.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ title: "Hello" }),
      })
    );
  });

  it("feiler når tittelen er 141 tegn", async () => {
    const longTitle = "a".repeat(141);
    const formData = makeFormData("list1", longTitle);

    const result = await createTask(formData);

    expect(result.success).toBe(false);
    expect(result.status).toBe(422);
    expect(result.message).toMatch(/max 140 characters/i);
    expect(prisma.task.create).not.toHaveBeenCalled();
  });
});
