import { TagStatus } from '@prisma/client';
import { Popover, Tag } from 'antd';

export type ColorListType = {
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
        return item.tags.map((item) => {
          return (
            <div key={item.tag.name + item.tag.color} className={'flex'}>
              <div>{item.tag.name}</div>
              <Tag className={'ml-1'} color={ColorMap[item.status]}>
                {item.status}
              </Tag>
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
