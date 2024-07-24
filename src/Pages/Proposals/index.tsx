import React, { useEffect } from 'react';
import { Table, Spin, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { IProposal } from '../../Interfaces/proposal.interface';
import { FETCH_PROPOSALS_URL } from '../../Backend/apis';

import {
  fetchProposalsStart,
  fetchProposalsFailure,
  fetchProposalsSuccess,
} from '../../Store/slices/proposalSlice';
import { RootState } from '../../Store/appStore';

const ProposalsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { proposals, isLoading, error } = useSelector((state: RootState) => {
    return state.proposals;
  });

  const columns: ColumnsType<IProposal> = [
    {
      title: 'CustomerName',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Value / Term',
      dataIndex: 'term',
      key: 'term',
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
    {
      title: 'Delete',
      key: 'delete',
      render: () => {
        return (
          <Button type="dashed">
            <span style={{ color: 'red' }}>X</span>
          </Button>
        );
      },
    },
  ];

  // Methods
  const fetchData = async () => {
    try {
      dispatch(fetchProposalsStart());
      const url = FETCH_PROPOSALS_URL;
      const jwtToken = Cookies.get('jwtToken');

      const response = await axios.get<{ data: IProposal[] }>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = response.data?.data;
      dispatch(fetchProposalsSuccess(data));
    } catch (err) {
      dispatch(fetchProposalsFailure('Error fetching proposals'));
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

  return <Table dataSource={proposals} columns={columns} rowKey="id" />;
};

export default ProposalsTable;
