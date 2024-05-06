'use client';
import { ArticleStatus } from '@prisma/client';
import { Button, Space, TableProps, Tag } from 'antd';
import { ITableDataType } from '@/app/ui/s-component/s-table';

export interface IDataType extends ITableDataType {
  id: number;
  title: string;
  content: string;
  articleStatus: ArticleStatus;
  createdAt: Date;
}

export const columns: TableProps<IDataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Content',
    dataIndex: 'content',
  },
  {
    title: 'CreateAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'Status',
    dataIndex: 'articleStatus',
    render(_, { articleStatus }) {
      const color =
        articleStatus === ArticleStatus.Finished ? 'green' : 'volcano';
      return <Tag color={color}>{articleStatus.toUpperCase()}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render() {
      return (
        <Space size={'middle'}>
          <Button type={'primary'}>标注</Button>
          <Button>删除</Button>
        </Space>
      );
    },
  },
];
