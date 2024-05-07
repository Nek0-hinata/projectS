import { Table, TableProps } from 'antd';
import { Key } from 'react';

export interface ITableDataType {
  key: Key;
}

interface IProps<T> {
  dataSource: T[];
  columns: TableProps<T>['columns'];
}

export default function STable<T extends ITableDataType>(props: IProps<T>) {
  return <Table columns={props.columns} dataSource={props.dataSource} />;
}
