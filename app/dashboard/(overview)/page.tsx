import { lusitana } from '@/app/ui/fonts';
import {
  getInternetDetailById,
  getTrafficByUserEmail,
  getUserDashboard,
} from '@/app/lib/data';
import SDescription from '@/app/ui/s-component/s-description';
import { auth, signOut } from '@/auth';
import { Button } from 'antd';

export default async function Page() {
  const data = await getUserDashboard();
  const session = await auth();
  let internetDetail;
  if (session?.internetDetailId) {
    internetDetail = await getInternetDetailById(session.internetDetailId);
  }
  if (session?.user?.email) {
    const now = new Date();
    const a = await getTrafficByUserEmail(
      session.user.email,
      now.getFullYear(),
      now.getMonth(),
    );
  }

  const items = {
    ...data,
    ipAddress: internetDetail?.ipAddress,
    macAddress: internetDetail?.macAddress,
    signOut: (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button htmlType={'submit'}>sign out</Button>
      </form>
    ),
    currentTraffic: internetDetail?.currentTraffic,
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        仪表板
      </h1>
      {data && <SDescription items={items} />}
    </main>
  );
}
