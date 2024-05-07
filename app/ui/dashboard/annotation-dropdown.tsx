import { Dropdown, MenuProps } from 'antd';

export interface IAnnotationDropdownProps {
  open: boolean;
  span: {
    height: number;
    top: number;
    left: number;
  };
  menu?: MenuProps;
  items: MenuProps['items'];
}

export default function AnnotationDropdown(props: IAnnotationDropdownProps) {
  const { span, open, menu, items } = props;
  return (
    <>
      {span.top && span.left && (
        <Dropdown menu={{ ...menu, items }} open={open} arrow={true}>
          <span
            style={{
              position: 'absolute',
              top: `${span.top + span.height}px`,
              left: `${span.left}px`,
            }}
          />
        </Dropdown>
      )}
    </>
  );
}
