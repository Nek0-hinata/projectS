import { lusitana } from '@/app/ui/fonts';
import { getUserDashboard } from '@/app/lib/data';

export default async function Page() {
  await getUserDashboard();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        仪表板
      </h1>
    </main>
  );
}
