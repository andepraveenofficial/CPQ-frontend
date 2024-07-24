import React, { useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';

import { useSelector } from 'react-redux';

import { Button } from 'antd';
import { ICustomer } from '../../Interfaces/customer.interface';
import { FETCH_CUSTOMERS_URL } from '../../Backend/apis';
import {
  fetchCustomersFailure,
  fetchCustomersStart,
  fetchCustomersSuccess,
} from '../../Store/slices/customerSlice';
import { RootState } from '../../Store/appStore';
import TableWrapper from '../../Wrappers/TableWrapper';
import useFetchData from '../../Hooks/useFetchData';

const CustomersTable: React.FC = () => {
  const { isLoading, customers, error } = useSelector((state: RootState) => {
    return state.customers;
  });

  const columns: ColumnsType<ICustomer> = [
    {
      title: 'Legal Company Name',
      dataIndex: 'legal_company_name',
      key: 'legal_company_name',
    },
    {
      title: 'Currency',
      dataIndex: 'default_currency',
      key: 'default_currency',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postal_code',
      key: 'postal_code',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Button
            type="dashed"
            onClick={() => {
              // Handle actions for the customer here
              console.log(record);
            }}
          >
            Details
          </Button>
        );
      },
    },
  ];

  const dataDetails = {
    url: FETCH_CUSTOMERS_URL,
    startAction: fetchCustomersStart,
    successAction: fetchCustomersSuccess,
    failureAction: fetchCustomersFailure,
  };

  const fetchData = useFetchData(dataDetails);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableWrapper<ICustomer>
      loading={isLoading}
      data={customers}
      error={error}
      columns={columns}
      rowKey="id"
    />
  );
};

export default CustomersTable;
