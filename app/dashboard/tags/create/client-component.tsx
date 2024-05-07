'use client';

import SForm, { FormItemType } from '@/app/ui/s-component/s-form';
import { ColorPicker, Input, message } from 'antd';
import { createTag, editTag, getTagWithColor } from '@/app/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { SideBarEnum } from '@/app/types/types';

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
  color: string;
}

interface IProps {
  initialValue?: IFormItemType;
}

export function CreateTagForm(props: IProps) {
  const params = useSearchParams();
  const router = useRouter();
  const tagID = params.get('id');

  async function handleOnCreate(value: IFormItemType) {
    const { color, name } = value;
    const findExistedColor = await getTagWithColor(color);
    if (findExistedColor) {
      message.warning('已有相同颜色，请考虑创建不同颜色的tag');
      return;
    }
    const createdTag = await createTag(name, color);
    if (createdTag) {
      message.success('标签创建成功');
    }
  }

  async function handleOnEdit(value: IFormItemType) {
    const id = Number(tagID);
    const editedTag = await editTag(id, value);
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
