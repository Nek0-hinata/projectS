import { Skeleton } from 'antd';

export default function Loading() {
  return (
    <div className={'flex items-center justify-center'}>
      <Skeleton className={'mt-20'} active paragraph={{ rows: 5 }} />
    </div>
  );
}
