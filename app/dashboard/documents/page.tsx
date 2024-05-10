import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/documents/client-component';
import { getAllArticle } from '@/app/lib/actions';
import { auth } from '@/auth';
import { Permission } from '@prisma/client';
import Header from '@/app/ui/dashboard/header';

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
      <Header title={'数据集'} />
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </main>
  );
}
