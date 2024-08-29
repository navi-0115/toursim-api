import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const landmark = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Landmark",
      places: {
        create: [
          {
            name: "Taipei 101",
            description: "A famous skyscraper in Taipei.",
          },
          {
            name: "Chiang Kai-shek Memorial Hall",
            description:
              "The Chiang Kai-shek Memorial Hall is a national monument dedicated to the former President of the Republic of China. The site is an important cultural landmark with significant historical exhibits.",
          },
        ],
      },
    },
  });

  const nature = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Nature",
      places: {
        create: [
          {
            name: "Taroko Gorge",
            description:
              "Taroko Gorge is one of Taiwan's most spectacular natural wonders, featuring towering marble cliffs, deep gorges, and scenic hiking trails. It's a must-visit for nature lovers.",
          },
          {
            name: "Sun Moon Lake",
            description:
              "Sun Moon Lake is Taiwan's largest natural lake and a popular destination for its stunning views, boat tours, and surrounding hiking and biking trails.",
          },
          {
            name: "Kenting National Park",
            description:
              "Located on the southern tip of Taiwan, Kenting National Park is known for its tropical beaches, lush forests, and vibrant nightlife in the nearby town.",
          },
        ],
      },
    },
  });
  console.log({ landmark, nature });
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
