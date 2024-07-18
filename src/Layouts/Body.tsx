import { Layout } from 'antd';
import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

const Body: React.FC = () => {
  return (
    <Layout>
      <Sidebar />
      <Content />
    </Layout>
  );
};

export default Body;
