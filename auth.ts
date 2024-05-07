import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';
import { Permission } from '@prisma/client';

async function getUser(email: string) {
  try {
    return await prisma.users.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            const id = user.id;
            await prisma.users.update({
              where: {
                id,
              },
              data: {
                lastSignInTime: new Date(),
              },
            });
            return {
              ...user,
              permission: user.permission,
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.permission = user.permission;
      }
      return token;
    },
    session({ session, token }) {
      session.permission = token.permission as Permission;
      return session;
    },
  },
});
