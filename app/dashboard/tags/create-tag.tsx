'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';

export default function CreateTag() {
  const router = useRouter();

  async function handleOnClick() {
    router.push('/dashboard/tags/create');
  }

  return (
    <Button
      onClick={handleOnClick}
      className={'float-right mb-5 mr-32'}
      type={'primary'}
    >
      新增标签
    </Button>
  );
}
