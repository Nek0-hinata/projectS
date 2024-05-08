import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/documents/client-component';
import { getAllArticle } from '@/app/lib/actions';
import { lusitana } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { Permission } from '@prisma/client';

export default async function Page() {
  const article = await getAllArticle();
  const session = await auth();
  const permission = session?.permission ?? Permission.User;
  const dataSource = article.map((item) => {
    const { title, content, id, createdAt, articleStatus } = item;
    return {
      key: id,
      title,
      id,
      content,
      articleStatus,
      createdAt,
      permission,
    };
  });
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        数据集
      </h1>
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </main>
  );
}
