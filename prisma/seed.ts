import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruker",
      email: "test@example.com",
      password: "hemmelig"
    },
  });

  const list = await prisma.list.create({
    data: {
      name: "Handleliste",
      userId: user.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Kjøpe melk",
      listId: list.id,
      completed: false,
      tags: "[]"
    },
  });
}

main()
  .then(() => console.log('✅ Seed ferdig'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
