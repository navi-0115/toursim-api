import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Landmark",
      places: {
        create: {
          name: "Taipei 101",
          description: "A famous skyscraper in Taipei.",
        },
      },
    },
  });
  console.log({ category });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
