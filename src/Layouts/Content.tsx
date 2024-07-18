import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Content: React.FC = () => {
  return (
    <Layout style={{ marginLeft: 5, width: '100%' }}>
      <Header />
      <Layout.Content style={{ padding: '24px', minHeight: '100vh' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default Content;
