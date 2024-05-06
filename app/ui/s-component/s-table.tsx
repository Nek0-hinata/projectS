import { Table, TableProps } from 'antd';

export interface ITableDataType {}

interface IProps<T> {
  dataSource: T[];
  columns: TableProps<T>['columns'];
}

export default function STable<T extends ITableDataType>(props: IProps<T>) {
  return <Table columns={props.columns} dataSource={props.dataSource} />;
}
