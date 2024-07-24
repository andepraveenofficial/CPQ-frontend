import React, { useEffect } from 'react';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { IProposal } from '../../Interfaces/proposal.interface';
import { FETCH_PROPOSALS_URL } from '../../Backend/apis';

import {
  fetchProposalsStart,
  fetchProposalsFailure,
  fetchProposalsSuccess,
} from '../../Store/slices/proposalSlice';
import { RootState } from '../../Store/appStore';
import TableWrapper from '../../Wrappers/TableWrapper';
import useFetchData from '../../Hooks/useFetchData';

const ProposalsTable: React.FC = () => {
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

  const dataDetails = {
    url: FETCH_PROPOSALS_URL,
    startAction: fetchProposalsStart,
    successAction: fetchProposalsSuccess,
    failureAction: fetchProposalsFailure,
  };

  const fetchData = useFetchData(dataDetails);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableWrapper<IProposal>
      loading={isLoading}
      data={proposals}
      error={error}
      columns={columns}
      rowKey="id"
    />
  );
};

export default ProposalsTable;
