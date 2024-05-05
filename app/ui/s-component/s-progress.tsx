import { Progress } from 'antd';

interface IProps {
  percent: number;
}

export default function SProgress(props: IProps) {
  const percent = props.percent > 100 ? 100 : props.percent;
  return <Progress percent={percent} />;
}
