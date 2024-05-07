'use client';
import { MouseEventHandler, useRef, useState } from 'react';
import { useTextSelection } from 'ahooks';
import AnnotationDropdown, {
  IAnnotationDropdownProps,
} from '@/app/ui/dashboard/annotation-dropdown';
import { tag as Tag } from '@prisma/client';
import { ColorPicker } from 'antd';
import {
  createOrGetSentenceWithArticleId,
  createSentenceTag,
} from '@/app/lib/actions';

interface IProps {
  title: string;
  content: string;
  articleId: number;
  tagList: Tag[];
}

interface IRange {
  start: number;
  end: number;
}

const initRange = {
  start: 0,
  end: 0,
};

export default function AnnotateArticle({
  title,
  articleId,
  content,
  tagList,
}: IProps) {
  const [range, setRange] = useState<IRange>(initRange);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textSelection = useTextSelection(ref.current);
  const { top, left, width, height, text } = textSelection;
  const items: IAnnotationDropdownProps['items'] = tagList.map((item) => {
    const { id, color, name } = item;

    async function handleOnTagClick() {
      const sentence = await createOrGetSentenceWithArticleId(articleId, {
        content: text,
        startPosition: range.start,
        endPosition: range.end,
      });

      const sentenceTag = await createSentenceTag(sentence.id, id);
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
      const range = selection.getRangeAt(0);
      setRange({
        start: range.startOffset,
        end: range.endOffset,
      });
      console.log(range);
    }
  };

  function handleOnClick() {
    setOpen(false);
    setRange(initRange);
  }

  return (
    <div>
      <h1 className={'text-2xl'}>{title}</h1>
      <div
        className={'m-auto mt-16 w-1/2 rounded border p-4 shadow-lg'}
        onMouseUp={handleMouseUp}
        ref={ref}
      >
        {content}
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
      <div onClick={handleOnClick}>
        {range.start} {range.end}
      </div>
    </div>
  );
}
