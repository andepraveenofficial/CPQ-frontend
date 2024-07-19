import React, { useEffect, useState } from 'react';
import { Table, Spin, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import Cookies from 'js-cookie';

interface IProduct {
  id: number;
  name: string;
  internal_name: string;
  description: string;
  charge_method: string;
  currency: string;
  unit_price: number;
  status: string;
  last_activity: string;
}

const ProductsTable: React.FC = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pricing',
      dataIndex: 'charge_method',
      key: 'charge_method',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },

    {
      title: 'Last Activity',
      dataIndex: 'last_activity',
      key: 'last_activity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <Button
            type="dashed"
            onClick={() => {
              // return handleStatusClick();
              console.log(record);
            }}
          >
            {text}
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:5000/api/v1/products';
        const jwtToken = Cookies.get('jwtToken');

        const response = await axios.get<IProduct[]>(url, {
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

export default ProductsTable;
