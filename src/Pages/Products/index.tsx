import React, { useEffect } from 'react';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useSelector } from 'react-redux';

import { IProduct } from '../../Interfaces/product.interface';
import { FETCH_PRODUCTS_URL } from '../../Backend/apis';

import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from '../../Store/slices/productSlice';
import { RootState } from '../../Store/appStore';
import TableWrapper from '../../Wrappers/TableWrapper';
import useFetchData from '../../Hooks/useFetchData';

const ProductsTable: React.FC = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => {
    return state.products;
  });

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
              console.log(record);
            }}
          >
            {text}
          </Button>
        );
      },
    },
  ];

  // Methods
  /*
    const fetchData = async () => {
    try {
      dispatch(fetchProductsStart());
      const url = FETCH_PRODUCTS_URL;
      const jwtToken = Cookies.get('jwtToken');

      const response = await axios.get<{ data: IProduct[] }>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = response.data?.data;
      dispatch(fetchProductsSuccess(data));
    } catch (err) {
      dispatch(fetchProductsFailure('Error fetching products'));
    }
  };

  */

  const dataDetails = {
    url: FETCH_PRODUCTS_URL,
    startAction: fetchProductsStart,
    successAction: fetchProductsSuccess,
    failureAction: fetchProductsFailure,
  };

  const fetchData = useFetchData(dataDetails);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableWrapper<IProduct>
      loading={isLoading}
      data={products}
      error={error}
      columns={columns}
      rowKey="id"
    />
  );
};

export default ProductsTable;
