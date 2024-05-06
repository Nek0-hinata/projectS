'use client';
import { ITableDataType } from '@/app/ui/s-component/s-table';
import { Button, Space, TableProps } from 'antd';
import dayjs from 'dayjs';

export interface IDataType extends ITableDataType {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
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
    render(_, record) {
      return (
        <Space size={'middle'}>
          <Button type={'primary'}>编辑</Button>
          <Button>删除</Button>
        </Space>
      );
    },
  },
];
