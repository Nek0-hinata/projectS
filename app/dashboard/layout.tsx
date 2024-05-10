import SideBar from '@/app/dashboard/side-bar';
import { ReactNode } from 'react';
import { auth } from '@/auth';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await auth();
  return (
    <div className={'flex min-h-screen bg-white'}>
      <div className={'h-screen w-1/6'}>
        <SideBar permission={user?.permission} />
      </div>
      <div className={'min-h-screen w-screen bg-white pt-4'}>
        <div>{children}</div>
      </div>
    </div>
  );
}
