'use client';
import { ArticleStatus } from '@prisma/client';
import { Button, message, Space, TableProps, Tag } from 'antd';
import { ITableDataType } from '@/app/ui/s-component/s-table';
import dayjs from 'dayjs';
import { deleteArticle } from '@/app/lib/actions';

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
    render(_, { createdAt }) {
      return <div>{dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>;
    },
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
    render(_, { id }) {
      async function handleOnDelete() {
        const deletedArticles = await deleteArticle(id);
        if (deletedArticles) {
          message.success('删除成功');
        }
      }

      return (
        <Space size={'middle'}>
          <Button type={'primary'}>标注</Button>
          <Button onClick={handleOnDelete}>删除</Button>
        </Space>
      );
    },
  },
];