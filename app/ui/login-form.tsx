'use client';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import SForm, { FormItemType } from '@/app/ui/s-form';
import { Input } from 'antd';
import Password from 'antd/lib/input/Password';
import { signIn } from 'next-auth/react';

type FieldType = {
  email?: string;
  password?: string;
};

const items: FormItemType[] = [
  {
    name: 'email',
    label: '邮箱',
    component: Input,
    rules: [
      {
        required: true,
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
    ],
  },
  {
    name: 'password',
    label: '密码',
    component: Password,
    rules: [{ required: true, message: 'Please input your password!' }],
  },
];

export default function LoginForm() {
  async function handleOnFinish(value: FieldType) {
    await signIn('credentials', value);
  }

  return (
    <div className={'rounded-xl border p-5'}>
      <SForm<FieldType> formItems={items} onFinish={handleOnFinish} />
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
