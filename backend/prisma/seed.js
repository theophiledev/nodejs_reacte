// Run with: npx prisma db seed
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const theo = await prisma.user.upsert({
    where: { email: 'theo@example.com' },
    update: {},
    create: { name: 'Theo', email: 'theo@example.com' }
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { name: 'Alice', email: 'alice@example.com' }
  });

  // Create posts
  await prisma.post.createMany({
    data: [
      { title: 'Introduction to Prisma', content: 'Prisma is a modern ORM...', published: true,  authorId: theo.id  },
      { title: 'PostgreSQL Tips',        content: 'Some useful tips...',        published: false, authorId: theo.id  },
      { title: 'React with Axios',       content: 'How to use Axios...',        published: true,  authorId: alice.id },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully!');
  console.log(`   Users: Theo (id=${theo.id}), Alice (id=${alice.id})`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
