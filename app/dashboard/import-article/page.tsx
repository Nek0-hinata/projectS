import ImportArticle from '@/app/dashboard/import-article/client-component';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <div className={'w-full'}>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        文章导入
      </h1>
      <div className={'m-auto mt-20 w-1/2'}>
        <ImportArticle />
      </div>
    </div>
  );
}
