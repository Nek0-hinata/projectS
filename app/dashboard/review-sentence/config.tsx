'use client';

import { ITableDataType } from '@/app/ui/s-component/s-table';
import { Button, MenuProps, message, TableProps, Tag } from 'antd';
import { TagStatus } from '@prisma/client';
import Dropdown from 'antd/lib/dropdown/dropdown';
import { updateSentenceTagStatus } from '@/app/lib/actions';

export interface IDataType extends ITableDataType {
  status: TagStatus;
  sentenceContent: string;
  tagName: string;
  tagColor: string;
  articleTitle: string;
  sentenceId: number;
  tagId: number;
}

const handleOnMenuClick = async (
  sentenceId: number,
  tagId: number,
  e: {
    key: string;
  },
) => {
  const res = await updateSentenceTagStatus(
    sentenceId,
    tagId,
    e.key as TagStatus,
  );
  if (res) {
    message.success(`已成功切换状态为${e.key}`);
  }
};

export const columns: TableProps<IDataType>['columns'] = [
  {
    title: '状态',
    dataIndex: 'status',
    render(status: TagStatus) {
      const statusColorMap: Record<TagStatus, string> = {
        [TagStatus.Pending]: 'geekblue',
        [TagStatus.Approved]: 'green',
        [TagStatus.Rejected]: 'red',
      };
      const color = statusColorMap[status];
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '标签',
    dataIndex: 'tagName',
    render(_, { tagName, tagColor }) {
      return <Tag color={tagColor}>{tagName}</Tag>;
    },
  },
  {
    title: '标注语句',
    dataIndex: 'sentenceContent',
  },
  {
    title: '所属文章',
    dataIndex: 'articleTitle',
  },
  {
    title: '操作',
    render(_, { sentenceId, tagId, status }) {
      const menuList: MenuProps['items'] = Object.values(TagStatus)
        .filter((item) => item !== status)
        .map((value) => {
          return {
            label: value,
            key: value,
          };
        });
      return (
        <Dropdown
          menu={{
            items: menuList,
            onClick: (e) => handleOnMenuClick(sentenceId, tagId, e),
          }}
        >
          <Button>改变状态</Button>
        </Dropdown>
      );
    },
  },
];
