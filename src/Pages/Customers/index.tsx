import React, { useEffect } from 'react';
import { Table, Spin, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ICustomer } from '../../Interfaces/customer.interface';
import { FETCH_CUSTOMERS_URL } from '../../Backend/apis';
import {
  fetchCustomersFailure,
  fetchCustomersStart,
  fetchCustomersSuccess,
} from '../../Store/slices/customerSlice';
import { RootState } from '../../Store/appStore';

const CustomersTable: React.FC = () => {
  const dispatch = useDispatch();
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

  // Methods
  const fetchData = async () => {
    try {
      dispatch(fetchCustomersStart());
      const url = FETCH_CUSTOMERS_URL;
      const jwtToken = Cookies.get('jwtToken');

      const response = await axios.get<{ data: ICustomer[] }>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = response.data?.data;
      dispatch(fetchCustomersSuccess(data));
    } catch (err) {
      dispatch(fetchCustomersFailure('Error fetching Customers'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <Table dataSource={customers} columns={columns} rowKey="id" />;
};

export default CustomersTable;
