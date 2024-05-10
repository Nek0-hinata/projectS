import { Permission, PrismaClient } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    permission: Permission;
  }

  interface User {
    permission: Permission;
  }

  interface JWT {
    permission: Permission;
  }
}

declare global {
  var prisma: PrismaClient;
}
