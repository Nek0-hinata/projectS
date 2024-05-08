import { auth, signIn } from '@/auth';
import { Session } from 'next-auth';
import prisma from '@/app/lib/prisma';

async function getSession(): Promise<Session | undefined> {
  const session = await auth();
  if (!session) {
    await signIn();
  } else {
    return session;
  }
}

export async function getUserDashboard() {
  const session = await getSession();
  if (session?.user?.email) {
    const users = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (users) {
      const { username, email, status } = users;
      return {
        username,
        email,
        status,
      };
    }
  }
}
