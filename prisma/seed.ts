import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Opprett en testbruker
  const user = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruker",
      email: "test@example.com",
      password: "hemmelig",
    },
  });

  // Oppretter to lister
  const list1 = await prisma.list.create({
    data: {
      name: "Handleliste",
      userId: user.id,
    },
  });

  const list2 = await prisma.list.create({
    data: {
      name: "Gjøremål",
      userId: user.id,
    },
  });

  // Legger til flere oppgaver i Handleliste
  await prisma.task.createMany({
    data: [
      {
        title: "Melk",
        listId: list1.id,
        completed: false,
        tags: [],
      },
      {
        title: "Brød",
        listId: list1.id,
        completed: false,
        tags: [],
      },
      {
        title: "Egg",
        listId: list1.id,
        completed: true,
        tags: [],
      },
    ],
  });

  // Legger til flere oppgaver i Gjøremål
  await prisma.task.createMany({
    data: [
      {
        title: "Vaske badet",
        listId: list2.id,
        completed: false,
        tags: ["husarbeid"],
      },
      {
        title: "Støvsuge",
        listId: list2.id,
        completed: false,
        tags: [],
      },
    ],
  });
}

main()
  .then(() => console.log("Seed ferdig"))
  .catch((e) => {
    console.error("Seed feilet:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
