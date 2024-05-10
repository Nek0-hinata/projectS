/**
 * ! Executing this script will delete all data in your database and seed it with 10 versions.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';
import bcrypt from 'bcrypt';
import { Permission } from '@prisma/client';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 users
  await seed.users((x) =>
    x(5, {
      // Use the fixed password
      password: bcrypt.hashSync('123456', 10),
    }),
  );

  await seed.users([
    {
      email: 'user@example.com',
      password: bcrypt.hashSync('123456', 10),
      permission: Permission.User,
    },
    {
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      permission: Permission.Admin,
    },
  ]);

  await seed.article((x) =>
    x(20, {
      articleStatus: 'UnFinished',
    }),
  );

  await seed.tag((x) => x(5));

  console.log('Database seeded successfully!');

  process.exit();
};

main();
