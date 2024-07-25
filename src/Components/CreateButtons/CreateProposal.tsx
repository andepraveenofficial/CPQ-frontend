import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateProposal: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const path = 'proposals/new';
    navigate(path);
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Create Proposal
    </Button>
  );
};

export default CreateProposal;
