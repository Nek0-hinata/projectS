import { Dropdown, MenuProps } from 'antd';

export interface IAnnotationDropdownProps {
  open: boolean;
  span: {
    height: number;
    width: number;
    top: number;
    left: number;
  };
  menu?: MenuProps;
  items: MenuProps['items'];
}

export default function AnnotationDropdown(props: IAnnotationDropdownProps) {
  const { span, open, menu, items } = props;
  return (
    <Dropdown menu={{ ...menu, items }} open={open} arrow={true}>
      <span
        style={{
          position: 'absolute',
          height: `${span.height}px`,
          width: `${span.width}px`,
          top: `${span.top}px`,
          left: `${span.left}px`,
        }}
      />
    </Dropdown>
  );
}
