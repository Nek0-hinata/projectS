import { TagStatus } from '@prisma/client';
import { Popover, Tag } from 'antd';

export type ColorListType = {
  content: string;
  startPosition: number;
  endPosition: number;
  tags: {
    tag: {
      name: string;
      color: string;
    };
    status: TagStatus;
  }[];
}[];

const ColorMap: Record<TagStatus, string> = {
  [TagStatus.Approved]: 'green',
  [TagStatus.Rejected]: 'red',
  [TagStatus.Pending]: 'blue',
};

interface IProps {
  content: string;
  colorList: ColorListType;
}

export default function ColorContent(props: IProps) {
  const { content, colorList } = props;
  let lastEndPosition = 0;
  let coloredContent = [];

  (colorList ?? [])
    .sort((a, b) => a.startPosition - b.startPosition)
    .reduce(
      (prev, cur) => {
        const tail = prev.length - 1;
        const last = prev[tail]?.endPosition ?? 0;
        let startPosition = Math.max(cur.startPosition, last);
        return [
          ...prev,
          {
            ...cur,
            startPosition,
          },
        ];
      },
      [] as typeof colorList,
    )
    .forEach((item, index) => {
      // 添加未标记的文本部分
      if (item.startPosition > lastEndPosition) {
        coloredContent.push(
          <span key={index + 'unmarked'}>
            {content.slice(lastEndPosition, item.startPosition)}
          </span>,
        );
      }
      const Content = () => {
        return item.tags.map((tag) => {
          return (
            <div key={tag.tag.name + tag.tag.color} className={'m-1 flex'}>
              <div>{tag.tag.name}</div>
              <Tag className={'ml-1'} color={ColorMap[tag.status]}>
                {tag.status}
              </Tag>
              <div style={{ color: tag.tag.color }}>{item.content}</div>
            </div>
          );
        });
      };
      coloredContent.push(
        <Popover key={index} content={Content}>
          <span style={{ color: item.tags[0].tag.color }}>
            {content.slice(item.startPosition, item.endPosition)}
          </span>
        </Popover>,
      );

      lastEndPosition = item.endPosition;
    });

  // 添加最后的未标记的文本部分
  if (lastEndPosition < content.length) {
    coloredContent.push(
      <span key="last">{content.slice(lastEndPosition)}</span>,
    );
  }

  return <p>{coloredContent.map((item) => item)}</p>;
}
