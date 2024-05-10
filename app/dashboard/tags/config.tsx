'use client';
import { ITableDataType } from '@/app/ui/s-component/s-table';
import { Button, ColorPicker, message, Space, TableProps } from 'antd';
import dayjs from 'dayjs';
import { deleteTag } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { SideBarEnum } from '@/app/types/types';

export interface IDataType extends ITableDataType {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
}

function Actions(props: { id: number }) {
  const { id } = props;
  const router = useRouter();

  async function handleOnEditTag() {
    router.push(`${SideBarEnum.Tags}/create?id=${id}`);
  }

  async function handleOnDelete() {
    const deletedTag = await deleteTag(id);
    if (deletedTag) {
      message.success('删除成功');
    }
  }

  return (
    <Space size={'middle'}>
      <Button onClick={handleOnEditTag} type={'primary'}>
        编辑
      </Button>
      <Button onClick={handleOnDelete}>删除</Button>
    </Space>
  );
}

export const columns: TableProps<IDataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Background Color',
    dataIndex: 'color',
    render(text) {
      return <ColorPicker defaultValue={text} disabled showText />;
    },
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    render(_, { createdAt }) {
      return <div>{dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>;
    },
  },
  {
    title: 'Actions',
    render(_, { id }) {
      return <Actions id={id} />;
    },
  },
];
