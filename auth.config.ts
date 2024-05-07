import { NextAuthConfig } from 'next-auth';
import { SideBarEnum } from '@/app/types/types';
import { Permission } from '@prisma/client';

const PermissionMap = {
  [SideBarEnum.Documents]: Permission.User,
  [SideBarEnum.Tags]: Permission.User,
  [SideBarEnum.Dashboard]: Permission.User,
  [SideBarEnum.ImportArticle]: Permission.User,
};

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
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
