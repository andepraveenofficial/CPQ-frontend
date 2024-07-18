import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import CreateCustomer from '../Components/CreateButtons/CreateCustomer';
import CreateProposal from '../Components/CreateButtons/CreateProposal';
import CreateProduct from '../Components/CreateButtons/CreateProduct';

const Header: React.FC = () => {
  const location = useLocation();

  const getHeaderData = () => {
    switch (location.pathname) {
      case '/subscriptions':
        return { title: 'Subscriptions', ButtonComponent: CreateCustomer };
      case '/':
        return { title: 'Proposals', ButtonComponent: CreateProposal };
      case '/products':
        return { title: 'Products', ButtonComponent: CreateProduct };
      case '/customers':
        return { title: 'Customers', ButtonComponent: CreateCustomer };
      case '/invoices':
        return { title: 'Invoices', ButtonComponent: null };

      default:
        return { title: 'Dashboard', ButtonComponent: null };
    }
  };

  const { title, ButtonComponent } = getHeaderData();

  return (
    <Layout.Header
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '5px',
        borderRadius: '5px',
      }}
    >
      <p>{title}</p>
      {ButtonComponent && <ButtonComponent />}
    </Layout.Header>
  );
};

export default Header;
