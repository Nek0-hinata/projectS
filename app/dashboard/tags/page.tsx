import { getAllTags } from '@/app/lib/actions';
import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/tags/config';
import CreateTag from '@/app/dashboard/tags/create-tag';
import Header from '@/app/ui/dashboard/header';

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
      <Header title={'标签管理'} />
      <CreateTag />
      <STable<IDataType> dataSource={dataSource} columns={columns} />
    </div>
  );
}
