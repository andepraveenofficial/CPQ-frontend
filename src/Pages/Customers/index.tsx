import React, { useEffect, useState } from 'react';
import { Table, Spin, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ICustomer {
  id: string;
  legal_company_name: string;
  default_currency: string;
  address: string;
  unit_floor: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const CustomersTable: React.FC = () => {
  const [data, setData] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/customers';
        const jwtToken = Cookies.get('jwtToken');

        const response = await axios.get<ICustomer[]>(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default CustomersTable;
