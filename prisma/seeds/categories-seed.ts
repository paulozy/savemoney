import { PrismaClient } from '@prisma/client';
import { defaultCategories } from 'src/utils/default-categories';

const prisma = new PrismaClient();

async function main() {
  for (const category of defaultCategories) {
    await prisma.category.create({
      data: {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });