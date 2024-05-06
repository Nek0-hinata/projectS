import { Button } from 'antd';
import { getAllTags } from '@/app/lib/actions';
import STable from '@/app/ui/s-component/s-table';
import { columns, IDataType } from '@/app/dashboard/tags/client-component';

export default async function Page() {
  const tagList = await getAllTags();
  return (
    <div>
      <div>标签管理</div>
      <Button className={'float-right mb-5 mr-32'} type={'primary'}>
        新增标签
      </Button>
      <STable<IDataType> dataSource={tagList} columns={columns} />
    </div>
  );
}
