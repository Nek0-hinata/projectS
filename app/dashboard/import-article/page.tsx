import ImportArticle from '@/app/dashboard/import-article/client-component';
import Header from '@/app/ui/dashboard/header';

export default async function Page() {
  return (
    <div className={'w-full'}>
      <Header title={'文章导入'} />
      <div className={'m-auto mt-20 w-1/2'}>
        <ImportArticle />
      </div>
    </div>
  );
}
