interface IProps {
  content: string;
  colorList: {
    startPosition: number;
    endPosition: number;
    color: string;
  }[];
}

export default function ColorContent(props: IProps) {
  const { content, colorList } = props;
  let lastEndPosition = 0;
  let coloredContent = [];

  colorList
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

      // 添加被标记的文本部分
      coloredContent.push(
        <span key={index} style={{ color: item.color }}>
          {content.slice(item.startPosition, item.endPosition)}
        </span>,
      );

      lastEndPosition = item.endPosition;
    });

  // 添加最后的未标记的文本部分
  if (lastEndPosition < content.length) {
    coloredContent.push(
      <span key="last">{content.slice(lastEndPosition)}</span>,
    );
  }

  return <div>{coloredContent.map((item) => item)}</div>;
}
