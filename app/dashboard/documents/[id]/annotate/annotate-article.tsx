'use client';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useTextSelection } from 'ahooks';
import AnnotationDropdown, {
  IAnnotationDropdownProps,
} from '@/app/ui/dashboard/annotation-dropdown';
import { tag as Tag } from '@prisma/client';
import { Button, ColorPicker, message } from 'antd';
import {
  createSentenceTagWithArticleId,
  getSentenceAndTagWithArticleId,
} from '@/app/lib/actions';
import ColorContent, {
  ColorListType,
} from '@/app/dashboard/documents/[id]/annotate/color-content';

interface IProps {
  title: string;
  content: string;
  articleId: number;
  tagList: Tag[];
}

interface IRange {
  start: number;
  end: number;
  text: string;
}

const initRange = {
  start: 0,
  end: 0,
  text: '',
};

export default function AnnotateArticle(props: IProps) {
  const { title, articleId, content, tagList } = props;
  const [range, setRange] = useState<IRange>(initRange);
  const [open, setOpen] = useState(false);
  const [colorList, setColorList] = useState<ColorListType>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { top, left, width, height } = useTextSelection(ref.current);
  const items: IAnnotationDropdownProps['items'] = tagList.map((item) => {
    const { id, color, name } = item;

    async function handleOnTagClick() {
      const sentence = await createSentenceTagWithArticleId(articleId, id, {
        content: range.text,
        startPosition: range.start,
        endPosition: range.end,
      });
      if (sentence) {
        message.success('标注tag成功');
        const colorList = await getSentenceAndTagWithArticleId(articleId);
        setColorList(colorList);
        setOpen(false);
      }
    }

    return {
      key: id,
      label: (
        <div onClick={handleOnTagClick} className={'text-center'}>
          <ColorPicker defaultValue={color} key={id} disabled={true} />
          <div>{name}</div>
        </div>
      ),
    };
  });

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const selection = window.getSelection();
    setOpen(true);
    if (selection?.rangeCount && selection?.rangeCount > 0) {
      const selectedContent = selection.toString();
      const regexp = new RegExp(selectedContent);
      const start = content.search(regexp);
      const end = start + selectedContent.length;
      setRange({
        start,
        end,
        text: selectedContent,
      });
    }
  };

  function handleOnClick() {
    setOpen(false);
    setRange(initRange);
  }

  useEffect(() => {
    getSentenceAndTagWithArticleId(articleId).then((res) => setColorList(res));
  }, [articleId]);

  return (
    <div>
      <h1 className={'text-2xl'}>{title}</h1>
      <div
        className={'m-auto mt-16 w-1/2 rounded border p-4 shadow-lg'}
        onMouseUp={handleMouseUp}
        ref={ref}
      >
        <ColorContent content={content} colorList={colorList} />
      </div>
      <AnnotationDropdown
        open={open}
        span={{
          height,
          width,
          top,
          left,
        }}
        items={items}
      />
      <div className={'flex w-full items-center justify-center'}>
        <Button
          className={'mt-20 w-1/3'}
          type={'primary'}
          onClick={handleOnClick}
        >
          关闭标注窗口
        </Button>
      </div>
    </div>
  );
}