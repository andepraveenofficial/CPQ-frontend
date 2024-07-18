import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Content: React.FC = () => {
  return (
    <div>
      <Layout style={{ marginLeft: 20 }}>
        <Layout.Content style={{ padding: '24px', minHeight: '100vh' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Content;
