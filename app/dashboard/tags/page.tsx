import { getAllTags } from '@/app/lib/actions';
import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/tags/config';
import CreateTag from '@/app/dashboard/tags/create-tag';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const tagList = await getAllTags();
  const dataSource = tagList.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });
  return (
    <div>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        标签管理
      </h1>
      <CreateTag />
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </div>
  );
}
