import React from 'react';
import { Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

// Define a type that extends Record<string, any> to satisfy the AnyObject requirement
type TableItem = Record<string, any>;

interface TableWrapperProps<T extends TableItem> {
  loading: boolean;
  data: T[];
  error: string | null;
  columns: ColumnsType<T>;
  rowKey: string;
}

const TableWrapper = <T extends TableItem>({
  loading,
  data,
  error,
  columns,
  rowKey,
}: TableWrapperProps<T>): React.ReactElement => {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Failed to Fetch Data</div>;
  }

  return <Table dataSource={data} columns={columns} rowKey={rowKey} />;
};

export default TableWrapper;
