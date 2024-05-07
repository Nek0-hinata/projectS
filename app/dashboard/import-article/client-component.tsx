'use client';
import SForm, { FormItemType } from '@/app/ui/s-component/s-form';
import { Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { createArticle } from '@/app/lib/actions';

const item: FormItemType[] = [
  {
    label: '标题',
    name: 'title',
    component: Input,
    required: true,
  },
  {
    label: '内容',
    name: 'content',
    component: TextArea,
    required: true,
  },
];

interface IFormField {
  title: string;
  content: string;
}

export default function ImportArticle() {
  async function handleOnFinish(value: IFormField) {
    const res = await createArticle(value.title, value.content);
    if (res) {
      message.info('文章导入成功');
    }
  }

  return <SForm<IFormField> formItems={item} onFinish={handleOnFinish} />;
}
