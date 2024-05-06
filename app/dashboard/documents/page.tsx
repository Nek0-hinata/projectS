import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/documents/clientComponent';
import { getAllArticle } from '@/app/lib/actions';

export default async function Page() {
  const article = await getAllArticle();
  const dataSource = article.map((item) => {
    const { title, content, id, createdAt, articleStatus } = item;
    return {
      title,
      id,
      content,
      articleStatus,
    };
  });
  return (
    <div>
      <h1>数据集</h1>
      <STable<IDataType> dataSource={article} columns={columns} />
    </div>
  );
}
