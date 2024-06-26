import { NextAuthConfig } from 'next-auth';
import { SideBarEnum, SideBarUrl } from '@/app/types/types';
import { Permission } from '@prisma/client';

export const PermissionMap = {
  [SideBarEnum.Dashboard]: [Permission.User, Permission.Admin],
  [SideBarEnum.Documents]: [Permission.User, Permission.Admin],
  [SideBarEnum.Tags]: [Permission.Admin],
  [SideBarEnum.ImportArticle]: [Permission.User, Permission.Admin],
  [SideBarEnum.ReviewSentence]: [Permission.Admin],
} as Record<SideBarUrl, Permission[]>;

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const permission = auth?.permission ?? Permission.User;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        const pathname = nextUrl.pathname;
        const isPermission = Object.entries(PermissionMap).reduce(
          (prev, [key, value]) => {
            if (pathname.startsWith(key)) {
              if (value.includes(permission)) {
                return prev;
              }
              return 0;
            }
            return prev;
          },
          1,
        );
        if (isPermission) {
          return isLoggedIn;
        } else {
          return false;
        }
        // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
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
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
