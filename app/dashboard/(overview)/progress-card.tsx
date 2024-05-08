import SProgress from '@/app/ui/s-component/s-progress';

interface IProps {
  percent: number;
  title: string;
}

export default function ProgressCard({ percent, title }: IProps) {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div className={'m-5 text-2xl'}>{title}</div>
      <SProgress percent={percent} type={'circle'} size={400} />
    </div>
  );
}
