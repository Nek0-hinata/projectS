import { getAllTags } from '@/app/lib/actions';
import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/tags/config';
import CreateTag from '@/app/dashboard/tags/create-tag';

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
      <div>标签管理</div>
      <CreateTag />
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </div>
  );
}
