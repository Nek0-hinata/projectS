import { MenuProps } from 'antd';
import { Key, ReactNode } from 'react';

export type ItemType = {
  label: ReactNode;
  key: Key;
};

export interface IAnnotationDropdownProps {
  open: boolean;
  span: {
    height: number;
    top: number | undefined;
    left: number | undefined;
  };
  menu?: MenuProps;
  items: ItemType[];
}

type ValidatedSpan = {
  height: number;
  top: number;
  left: number;
};

export default function AnnotationDropdown(props: IAnnotationDropdownProps) {
  const { span, open, menu, items } = props;

  function isShow(
    span: IAnnotationDropdownProps['span'],
  ): span is ValidatedSpan {
    return typeof span.top === 'number' && typeof span.left === 'number';
  }

  return (
    <>
      {isShow(span) && open && (
        <div
          className={
            'z-10 mt-1 flex flex-col items-center justify-center rounded-2xl border bg-white p-2 shadow-2xl'
          }
          style={{
            position: 'absolute',
            left: `${span.left}px`,
            top: `${span.top + span.height}px`,
          }}
        >
          {items &&
            items.map((item) => {
              return (
                <div
                  className={
                    'h-fit w-full hover:cursor-pointer hover:bg-gray-100'
                  }
                  key={item.key}
                >
                  {item.label}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
