import ImportArticle from '@/app/dashboard/import-article/client-component';

export default async function Page() {
  return (
    <div className={'w-full'}>
      <div>文章导入</div>
      <div className={'m-auto mt-20 w-1/2'}>
        <ImportArticle />
      </div>
    </div>
  );
}
