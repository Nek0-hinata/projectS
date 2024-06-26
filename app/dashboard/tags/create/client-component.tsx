'use client';

import SForm, { FormItemType } from '@/app/ui/s-component/s-form';
import { ColorPicker, Input, message } from 'antd';
import { createTag, editTag, getTagWithColor } from '@/app/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { SideBarEnum } from '@/app/types/types';
import { Color } from 'antd/lib/color-picker';

const item: FormItemType[] = [
  {
    label: '标签名',
    name: 'name',
    component: Input,
    required: true,
  },
  {
    label: '标签颜色',
    name: 'color',
    component: ColorPicker,
    componentProps: {
      showText: true,
    },
    required: true,
  },
];

interface IFormItemType {
  name: string;
  color: Color | string;
}

type InitialValue = Omit<IFormItemType, 'color'> & {
  color: string;
};

interface IProps {
  initialValue?: InitialValue;
}

function colorToHex(color: Color | string): string {
  return typeof color === 'string' ? color : color.toHexString();
}

export function CreateTagForm(props: IProps) {
  const params = useSearchParams();
  const router = useRouter();
  const tagID = params.get('id');

  async function handleOnCreate(value: IFormItemType) {
    const { color, name } = value;
    const colorHex = colorToHex(color);
    const findExistedColor = await getTagWithColor(colorHex);
    if (findExistedColor.length) {
      message.warning('已有相同颜色，请考虑创建不同颜色的tag');
      return;
    }
    const createdTag = await createTag(name, colorHex);
    if (createdTag) {
      message.success('标签创建成功');
    }
  }

  async function handleOnEdit(value: IFormItemType) {
    const { name, color } = value;
    const colorHex = colorToHex(color);
    const id = Number(tagID);
    const editedTag = await editTag(id, {
      name,
      color: colorHex,
    });
    if (editedTag) {
      message.success(`已成功编辑tag${id}`);
      router.replace(SideBarEnum.Tags);
    }
  }

  return (
    <SForm<IFormItemType>
      onFinish={tagID ? handleOnEdit : handleOnCreate}
      formItems={item}
      initialValues={{
        color: '#1677FF',
        ...props.initialValue,
      }}
    />
  );
}
